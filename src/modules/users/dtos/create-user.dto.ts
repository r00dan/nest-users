import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UsersModel } from '../users.model';
import { Roles } from './user.dto';

export class CreateUserDto
  implements Pick<UsersModel, 'username' | 'email' | 'password' | 'age'>
{
  @IsString()
  @ApiProperty()
  username: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsEnum(Roles)
  @ApiProperty({ enum: Roles })
  @IsOptional()
  role?: Roles;

  @IsNumber()
  @ApiProperty()
  age: number;
}
