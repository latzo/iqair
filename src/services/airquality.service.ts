import {injectable, BindingScope, inject} from '@loopback/core';
import {IqairServiceProxy} from './iqair-service-proxy.service';

@injectable({scope: BindingScope.TRANSIENT})
export class AirqualityService {
  constructor(
    @inject('services.IqairServiceProxy') private iqairService: IqairServiceProxy,
  ) {}

  async fetchAirQuality(latitude: number, longitude: number): Promise<object> {
    const apiKey = '8558f839-b051-458c-bb67-7e2ea08c2b0c';
    try {
      const airQualityData = await this.iqairService.getNearestCityAirQuality(
        latitude, longitude, apiKey
      );
      return airQualityData;
    } catch (error) {
      console.error('Error fetching air quality:', error);
      throw error;
    }
  }
}
