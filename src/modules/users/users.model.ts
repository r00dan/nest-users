import { Entity, PrimaryColumn } from 'typeorm';

import { NullableColumn } from 'core/decorators/nullable-column.decorator';

@Entity()
export class UsersModel {
  @PrimaryColumn()
  id: string;

  @NullableColumn({ unique: true })
  username?: string;

  @NullableColumn({ unique: true })
  email?: string;

  @NullableColumn()
  age?: number;

  @NullableColumn()
  password?: number;

  @NullableColumn()
  created_at?: Date;

  @NullableColumn()
  updated_at?: Date;
}
