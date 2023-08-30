import { repository } from '@loopback/repository';
import { get, param } from '@loopback/rest';
import { AirqualityService} from '../services';

export class IqairController {
  constructor(
    @repository(AirqualityService) private airQualityService: AirqualityService,
  ) {}

  @get('/air-quality')
  async getAirQuality(
    @param.query.number('latitude') latitude: number,
    @param.query.number('longitude') longitude: number,
  ): Promise<object> {
    const airQuality = await this.airQualityService.fetchAirQuality(latitude, longitude);
    return airQuality;
  }

}
