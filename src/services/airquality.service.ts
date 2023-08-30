import {BindingScope, inject, injectable} from '@loopback/core';
import {IqairServiceProxy} from './iqair-service-proxy.service';
import {repository} from '@loopback/repository';
import {AirPolutionResultRepository} from '../repositories';
import {AirPolutionResult, AirPolutionResultRelations} from '../models';

@injectable({scope: BindingScope.TRANSIENT})
export class AirqualityService {
  constructor(
    @inject('services.IqairServiceProxy') private iqairServiceProxy: IqairServiceProxy,
    @repository(AirPolutionResultRepository) private airPolutionResultRepository: AirPolutionResultRepository,
  ) {}

  async fetchAirQualityWithLatAndLong(latitude: string, longitude: string): Promise<object> {
    const apiKey = '8558f839-b051-458c-bb67-7e2ea08c2b0c';
    try {
      const airQualityData = await this.iqairServiceProxy.getNearestCityAirQualityWithLatAndLong(
        latitude, longitude, apiKey
      );
      return this.extractPollutionData(airQualityData);
    } catch (error) {
      console.error('Error fetching air quality:', error);
      throw error;
    }
  }


  private extractPollutionData(data: object): object {
    // Extract and return the "pollution" part of the data
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const airPolution : AirPolution = {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    airPolution.Result = data['data']['current']['pollution'];

    return airPolution;
  }

  async saveAirQualityToDatabase(airQualityData: object) {
    try {
      // Create a new instance of the AirQuality model with the data
      let newAirQuality : AirPolutionResult = new AirPolutionResult();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      newAirQuality.aqius = airQualityData['Result']['aqius'];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      newAirQuality.mainus = airQualityData['Result']['mainus'];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      newAirQuality.aqicn =  airQualityData['Result']['aqicn'];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      newAirQuality.maincn = airQualityData['Result']['aqicn'];
      newAirQuality = await this.airPolutionResultRepository.create(newAirQuality);
      console.log('Air quality data saved to database:', newAirQuality);

      return newAirQuality;
    } catch (error) {
      console.error('Error saving air quality data to database:', error);
      throw error;
    }
  }

  async getParisMostPollutedResult():Promise<(AirPolutionResult & AirPolutionResultRelations) | null> {
    try {
      return await this.airPolutionResultRepository.findOne({
        order: ['aqius DESC', 'aqicn DESC'], // Order in descending order
      }) ; // Return null if no data found
    } catch (error) {
      console.error('Error finding highest air quality:', error);
      throw error;
    }
  }

}




export interface AirPolution {
  Result : unknown;
}