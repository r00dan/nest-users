import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { UsersModel } from '../users.model';

export class UpdateUserPasswordDto
  implements Required<Pick<UsersModel, 'password'>>
{
  @IsString()
  @ApiProperty()
  password: string;
}
