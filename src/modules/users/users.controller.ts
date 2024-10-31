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
import { CurrentUser } from 'core/decorators/current-user.decorator';
import { UsersModel } from './users.model';
import { UpdateUserPasswordDto } from './dtos/update-user-password.dto';

@ApiTags('[jwt] users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put()
  public async updateUser(
    @CurrentUser() user: UsersModel,
    @Body() dto: UpdateUserDto,
  ) {
    await this.usersService.updateUser(user.id, dto);
  }

  @Put('/password')
  public async updateUserPassword(
    @CurrentUser() user: UsersModel,
    @Body() dto: UpdateUserPasswordDto,
  ) {
    await this.usersService.updateUserPassword(user.id, dto);
  }

  @Delete()
  public async deleteUser(@CurrentUser() user: UsersModel) {
    await this.usersService.deleteUser(user.id);
  }
}
