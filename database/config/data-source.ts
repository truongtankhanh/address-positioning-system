import * as Entities from '../enities';
import { DataSource, DataSourceOptions } from 'typeorm';

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  entities: Object.values(Entities),
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: false,
};

export const AppDataSource = new DataSource(databaseConfig);
