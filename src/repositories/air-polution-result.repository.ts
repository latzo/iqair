import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {AirPolutionResult, AirPolutionResultRelations} from '../models';

export class AirPolutionResultRepository extends DefaultCrudRepository<
  AirPolutionResult,
  typeof AirPolutionResult.prototype.id,
  AirPolutionResultRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(AirPolutionResult, dataSource);
  }
}
