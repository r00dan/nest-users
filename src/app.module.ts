import { Module } from '@nestjs/common';

import { HealthModule } from './modules/health/health.module';
import { PostgresqlModule } from 'core/database/postgresql.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [PostgresqlModule, HealthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
