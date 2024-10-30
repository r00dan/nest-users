import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { UsersModel } from '../users.model';

export class UpdateUserDto
  implements Pick<UsersModel, 'username' | 'email' | 'password' | 'age'>
{
  @IsString()
  @IsOptional()
  @ApiProperty()
  username?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  password?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  age?: number;
}
