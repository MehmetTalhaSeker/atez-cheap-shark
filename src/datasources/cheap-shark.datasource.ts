import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'CheapShark',
  connector: 'rest',
  options: {
    header: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        url: 'https://www.cheapshark.com/api/1.0/{p}',
        query: {
          title: '{t}',
          action: '{a}',
          email: '{e}',
          gameID: '{gi}',
          price: '{pr}',
        },
      },
      functions: {
        getAllStores: ['p'],
        searchGames: ['p', 't'],
        setAlarm: ['p', 'a', 'e', 'gi', 'pr'],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class CheapSharkDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'CheapShark';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.CheapShark', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
