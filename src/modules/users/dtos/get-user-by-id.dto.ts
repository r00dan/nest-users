import { ApiProperty } from '@nestjs/swagger';

import { IsNanoId } from 'core/decorators/is-nanoid.decorator';

export class GetUserByIdDto {
  @IsNanoId()
  @ApiProperty()
  id: string;
}
