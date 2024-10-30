import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersModel } from './users.model';
import { TypeOrmModule } from '@nestjs/typeorm';

const models = [UsersModel];

@Module({
  imports: [TypeOrmModule.forFeature(models)],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
