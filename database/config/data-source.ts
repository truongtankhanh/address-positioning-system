import { DataSource, DataSourceOptions } from 'typeorm';
import * as Entities from '../entities';

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  entities: Object.values(Entities),
  migrations: [__dirname + '/database/*{.ts,.js}'],
  synchronize: false,
  logging: false,
};

export const AppDataSource = new DataSource(databaseConfig);
