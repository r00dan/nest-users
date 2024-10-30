import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { GetUserByIdDto } from './dtos/get-user-by-id.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Put('/:id')
  public async updateUser(
    @Param('id')
    id: GetUserByIdDto['id'],
    @Body() dto: UpdateUserDto,
  ) {
    await this.usersService.updateUser(id, dto);
  }

  @Delete('/:id')
  public async deleteUser(
    @Param('id')
    id: GetUserByIdDto['id'],
  ) {
    await this.usersService.deleteUser(id);
  }
}
