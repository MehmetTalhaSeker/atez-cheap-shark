import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Store} from '../models';
import {StoreRepository} from '../repositories';
import {inject} from '@loopback/core';
import {CheapShark} from '../services';

export class StoreController {
  constructor(
    @repository(StoreRepository)
    public storeRepository: StoreRepository,
    @inject('services.CheapShark') protected cheapSharkService: CheapShark,
  ) {}

  @post('/stores')
  @response(200, {
    description: 'Store model instance',
    content: {'application/json': {schema: getModelSchemaRef(Store)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Store, {
            title: 'NewStore',
            exclude: ['id'],
          }),
        },
      },
    })
    store: Omit<Store, 'id'>,
  ): Promise<Store> {
    return this.storeRepository.create(store);
  }

  @get('/stores')
  @response(200, {
    description: 'Array of Store model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Store, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Store) filter?: Filter<Store>): Promise<Store[]> {
    const count = await this.storeRepository.count();
    if (count.count < 35) {
      const storeResponse = await this.cheapSharkService.getAllStores(
        '/stores',
      );
      storeResponse.map(async st => {
        const storeObj = new Store();
        storeObj.id = parseInt(st.storeID);
        storeObj.name = st.storeName;
        storeObj.isActive = st.isActive;
        storeObj.logo = `https://www.cheapshark.com${st.images.logo}`;
        await this.storeRepository.create(storeObj);
      });
    }
    return this.storeRepository.find(filter);
  }
  @patch('/stores')
  @response(200, {
    description: 'Store PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Store, {partial: true}),
        },
      },
    })
    store: Store,
    @param.where(Store) where?: Where<Store>,
  ): Promise<Count> {
    return this.storeRepository.updateAll(store, where);
  }

  @get('/stores/{id}')
  @response(200, {
    description: 'Store model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Store, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Store, {exclude: 'where'})
    filter?: FilterExcludingWhere<Store>,
  ): Promise<Store> {
    return this.storeRepository.findById(id, filter);
  }

  @patch('/stores/{id}')
  @response(204, {
    description: 'Store PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Store, {partial: true}),
        },
      },
    })
    store: Store,
  ): Promise<void> {
    await this.storeRepository.updateById(id, store);
  }

  @put('/stores/{id}')
  @response(204, {
    description: 'Store PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() store: Store,
  ): Promise<void> {
    await this.storeRepository.replaceById(id, store);
  }

  @del('/stores/{id}')
  @response(204, {
    description: 'Store DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.storeRepository.deleteById(id);
  }
}
