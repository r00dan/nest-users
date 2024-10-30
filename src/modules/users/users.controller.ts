import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { LoggerInterceptor } from 'core/interceptors/logger.interceptor';
import { GetUserByIdDto } from './dtos/get-user-by-id.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
@UseInterceptors(LoggerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  public getUserById(
    @Param('id')
    id: GetUserByIdDto['id'],
  ) {
    return this.usersService.getUserById(id);
  }

  @Post()
  public createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }
}
