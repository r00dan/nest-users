import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModel } from 'modules/users/users.model';
import { TokenModule } from 'modules/token/token.module';

const models = [UsersModel];

@Module({
  imports: [TypeOrmModule.forFeature(models), TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
