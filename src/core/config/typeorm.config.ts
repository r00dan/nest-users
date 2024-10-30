import { DataSource, DataSourceOptions } from 'typeorm';

import { TypeormNamingStrategy } from './typeorm-naming.config';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  logging: false,
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
  synchronize: false,
  dropSchema: false,
  entities: ['dist/**/*.model{.js,.ts}'],
  migrationsRun: false,
  migrations: ['dist/migrations/*{.js,.ts}'],
  namingStrategy: new TypeormNamingStrategy(),
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
