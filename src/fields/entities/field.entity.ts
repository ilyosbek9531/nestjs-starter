import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Field } from '@prisma/client';

export class FieldEntity implements Field {
  @ApiProperty()
  id: string;

  @ApiProperty()
  field_name: string;

  @ApiProperty()
  field_slug: string;

  @ApiProperty()
  field_type: $Enums.FieldType;

  @ApiProperty()
  app_id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
