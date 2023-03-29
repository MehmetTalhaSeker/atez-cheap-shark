import {repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  response,
} from '@loopback/rest';
import {Game} from '../models';
import {GameRepository} from '../repositories';
import {inject, intercept} from '@loopback/core';
import {CheapShark} from '../services';

export class GameController {
  constructor(
    @repository(GameRepository)
    public gameRepository: GameRepository,
    @inject('services.CheapShark') protected cheapSharkService: CheapShark,
  ) {}

  @get('/games/search/{title}')
  @response(200, {
    description: 'Array of Game model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Game, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.path.string('title') title: string): Promise<Game[]> {
    const cheapSharkResponse = await this.cheapSharkService.searchGames(
      '/games',
      title,
    );

    await Promise.all(
      cheapSharkResponse.map(async gameResp => {
        const exists = await this.gameRepository.exists(gameResp.gameID);
        if (exists) {
          return this.gameRepository.updateById(gameResp.gameID, gameResp);
        }
        return this.gameRepository.create(gameResp);
      })
    );

    return this.gameRepository.find({where: {external: {ilike: `%${title}%`}}});
  }

  @get('/games/alarm/{action}/{email}/{gameID}/{price}')
  @intercept()
  async setAlarm(
    @param.path.string('action') action: string,
    @param.path.string('email') email: string,
    @param.path.string('gameID') gameID: string,
    @param.path.string('price') price: string,
  ): Promise<boolean> {
    const emailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailValidation.test(email)) {
      throw new HttpErrors.UnprocessableEntity('Invalid email!');
    }
    return this.cheapSharkService.setAlarm(
      '/alerts',
      action,
      email,
      gameID,
      price,
    );
  }
}
