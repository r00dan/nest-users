import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';

import { IsNanoId } from 'core/decorators/is-nanoid.decorator';
import { UsersModel } from '../users.model';

export class UserDto implements Required<Omit<UsersModel, 'password'>> {
  @IsNanoId()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  username: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNumber()
  @ApiProperty()
  age: number;

  @IsDate()
  @ApiProperty()
  created_at: Date;

  @IsDate()
  @ApiProperty()
  updated_at: Date;
}
