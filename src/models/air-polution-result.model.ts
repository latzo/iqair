import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class AirPolutionResult extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;


  @property({
    type: 'Date',
    required: true,
  })
  ts:Date = new Date();

  @property({
    aqius: 'number',
    required: true,
  })
  aqius:number;

  @property({
    mainus: 'string',
    required: true,
  })
  mainus:string;

  @property({
    aqicn: 'number',
    required: true,
  })
  aqicn:number;

  @property({
    maincn: 'string',
    required: true,
  })
  maincn:string;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AirPolutionResult>) {
    super(data);
  }
}

export interface AirPolutionResultRelations {
  // describe navigational properties here
}

export type AirPolutionResultWithRelations = AirPolutionResult & AirPolutionResultRelations;
