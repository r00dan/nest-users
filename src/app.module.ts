import { Module } from '@nestjs/common';

import { HealthModule } from './modules/health/health.module';
import { PostgresqlModule } from 'core/database/postgresql.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [PostgresqlModule, HealthModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
