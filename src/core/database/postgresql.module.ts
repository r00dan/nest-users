import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'core/config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],
})
export class PostgresqlModule {}
