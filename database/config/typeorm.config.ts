import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import * as Entities from '../entities';
import { databaseOptions } from './database-option';

config();

export const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  ...databaseOptions(process.env),
  entities: Object.values(Entities),
  synchronize: true,
};
