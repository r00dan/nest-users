import { Controller, Get, Param } from '@nestjs/common';

import { UsersService } from './users.service';
import { GetUserByIdDto } from './dtos/get-user-by-id.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
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
}
