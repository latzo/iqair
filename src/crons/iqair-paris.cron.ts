import {CronJob, cronJob} from '@loopback/cron';
import {service} from '@loopback/core';
import {AirqualityService} from '../services';

@cronJob()
export class IqairParisCron extends CronJob {
  constructor(
    @service(AirqualityService) private airQualityService: AirqualityService
  ) {
    super({
      name: 'my-job',
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onTick: async () => {
        // do the work
        const latitude = '48.856613';
        const longitude = '2.352222';

        try {
          const airQualityData = await this.airQualityService.fetchAirQualityWithLatAndLong(
            latitude, longitude
          );

          console.log(airQualityData);
          await this.saveAirQualityToDatabase(airQualityData);
        } catch (error) {
          console.error('Error during CRON job:', error);
        }
      },
      cronTime: '*/60 * * * * *', // Every ten second
      start: true,
    });
  }

  private async saveAirQualityToDatabase(airQualityData: object) {
    await this.airQualityService.saveAirQualityToDatabase(airQualityData);
  }
}