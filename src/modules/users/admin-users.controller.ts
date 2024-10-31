import {
  Body,
  Controller,
  Delete,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtAuthGuard } from 'core/guards/jwt-auth.guard';
import { AdminGuard } from 'core/guards/admin.guard';
import { GetUserByIdDto } from './dtos/get-user-by-id.dto';

@ApiTags('[admin] users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put('/:id')
  public async updateUser(
    @Param('id') id: GetUserByIdDto['id'],
    @Body() dto: UpdateUserDto,
  ) {
    await this.usersService.updateUser(id, dto);
  }

  @Delete('/:id')
  public async deleteUser(@Param('id') id: GetUserByIdDto['id']) {
    await this.usersService.deleteUser(id);
  }
}
