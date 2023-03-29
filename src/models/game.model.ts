import {Entity, model, property} from '@loopback/repository';

@model()
export class Game extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  gameID: number;

  @property({
    type: 'number',
  })
  steamAppID?: number;

  @property({
    type: 'string',
    required: true,
  })
  cheapest: string;

  @property({
    type: 'string',
    required: true,
  })
  cheapestDealID: string;

  @property({
    type: 'string',
    required: false,
  })
  external: string;

  @property({
    type: 'string',
    required: false,
  })
  internalName: string;

  @property({
    type: 'string',
    required: false,
  })
  thumb: string;

  constructor(data?: Partial<Game>) {
    super(data);
  }
}

export interface GameRelations {
  // describe navigational properties here
}

export type GameWithRelations = Game & GameRelations;
