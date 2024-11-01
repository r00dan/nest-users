import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersModel } from './users.model';
import { PublicUsersController } from './public-users.controller';
import { TokenModule } from 'modules/token/token.module';
import { AdminUsersController } from './admin-users.controller';

const models = [UsersModel];

@Module({
  imports: [TypeOrmModule.forFeature(models), TokenModule],
  controllers: [UsersController, PublicUsersController, AdminUsersController],
  providers: [UsersService],
})
export class UsersModule {}
