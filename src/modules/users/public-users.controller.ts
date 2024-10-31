import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { GetUserByIdDto } from './dtos/get-user-by-id.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@ApiTags('[public] users')
@Controller('users')
export class PublicUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  public getUserById(
    @Param('id')
    id: GetUserByIdDto['id'],
  ) {
    return this.usersService.getUserById(id);
  }

  @Get()
  public getUserList() {
    return this.usersService.getUserList();
  }

  @Post()
  public createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }
}
