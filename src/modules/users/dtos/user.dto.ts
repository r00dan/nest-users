import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { UsersModel } from '../users.model';

export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
}

export class UserDto implements Required<UsersModel> {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  username: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  age: number;

  @Exclude()
  @ApiProperty()
  password: string;

  @Expose()
  @ApiProperty({ enum: Roles })
  role: Roles;

  @Expose()
  @ApiProperty()
  created_at: Date;

  @Expose()
  @ApiProperty()
  updated_at: Date;
}
