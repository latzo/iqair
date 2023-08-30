import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'iqair',
  connector: 'rest',
  baseURL: 'https://api.airvisual.com/v2',
  crud: false,
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        url: 'https://api.airvisual.com/v2/nearest_city?lat={lat}&lon={lon}&key={apiKey}',
      },
      functions: {
        getNearestCityAirQualityWithLatAndLong: ['lat','lon','apiKey'],
      },
    },
    {
      template: {
        method: 'GET',
        url: 'https://api.airvisual.com/v2/nearest_city?key={apiKey}',
      },
      functions: {
        getNearestCityAirQuality: ['apiKey'],
      },
    }
  ],

};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class IqairDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'iqair';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.iqair', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
