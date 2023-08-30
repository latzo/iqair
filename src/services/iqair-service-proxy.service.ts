import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {IqairDataSource} from '../datasources';

export interface IqairServiceProxy {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getNearestCityAirQualityWithLatAndLong(lat: string, lon: string, apiKey: string): Promise<object>;
  getNearestCityAirQuality(apiKey: string): Promise<object>;
}

export class IqairServiceProxyProvider implements Provider<IqairServiceProxy> {
  constructor(
    // iqair must match the name property in the datasource json file
    @inject('datasources.iqair')
    protected dataSource: IqairDataSource = new IqairDataSource(),
  ) {}

  value(): Promise<IqairServiceProxy> {
    return getService(this.dataSource);
  }
}
