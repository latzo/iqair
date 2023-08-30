import {get, param} from '@loopback/rest';
import {AirqualityService} from '../services';
import {service} from '@loopback/core';
import {AirPolutionResult, AirPolutionResultRelations} from '../models';

export class IqairController {
  constructor(
    @service(AirqualityService) private airQualityService: AirqualityService,
  ) {}

  @get('/air-quality')
  async getAirQuality(
    @param.query.number('latitude') latitude: string,
    @param.query.number('longitude') longitude: string,
  ): Promise<object> {

    const airQuality = await this.airQualityService.fetchAirQualityWithLatAndLong(latitude,longitude);
    return airQuality;
  }


  @get('/air-quality-paris-most-polluted')
  async getParisAirQualityMostPolluted(
  ): Promise<(AirPolutionResult & AirPolutionResultRelations) | null> {

    return this.airQualityService.getParisMostPollutedResult();
  }
}
