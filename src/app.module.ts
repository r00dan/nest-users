import { Module } from '@nestjs/common';

import { HealthModule } from './modules/health/health.module';
import { PostgresqlModule } from 'core/database/postgresql.module';

@Module({
  imports: [PostgresqlModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
