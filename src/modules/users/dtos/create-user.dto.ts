import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { UsersModel } from '../users.model';

export class CreateUserDto
  implements Pick<UsersModel, 'username' | 'email' | 'password' | 'age'>
{
  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsNumber()
  @ApiProperty()
  age: number;
}
