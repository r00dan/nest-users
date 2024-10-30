import { Entity, PrimaryColumn } from 'typeorm';

import { NullableColumn } from 'core/decorators/nullable-column.decorator';
import { ApiProperty } from '@nestjs/swagger';

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

  @NullableColumn()
  @ApiProperty()
  created_at?: Date;

  @NullableColumn()
  @ApiProperty()
  updated_at?: Date;
}
