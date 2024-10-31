import { Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { NullableColumn } from 'core/decorators/nullable-column.decorator';
import { Roles } from './dtos/user.dto';

@Entity('users')
export class UsersModel {
  @PrimaryColumn()
  @ApiProperty()
  id: string;

  @NullableColumn({ unique: true })
  @ApiProperty()
  username?: string;

  @NullableColumn({ unique: true })
  @ApiProperty()
  email?: string;

  @NullableColumn()
  @ApiProperty()
  age?: number;

  @NullableColumn()
  @ApiProperty()
  password?: string;

  @NullableColumn({ enum: Roles, default: Roles.USER })
  @ApiProperty({ enum: Roles })
  role?: Roles;

  @NullableColumn()
  @ApiProperty()
  created_at?: Date;

  @NullableColumn()
  @ApiProperty()
  updated_at?: Date;
}
