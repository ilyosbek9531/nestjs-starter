import { ApiProperty } from '@nestjs/swagger';
import { Field, FieldType } from '@prisma/client';

export class FieldEntity implements Field {
  @ApiProperty()
  id: string;

  @ApiProperty()
  field_name: string;

  @ApiProperty()
  field_slug: string;

  @ApiProperty({
    enum: [
      'SINGLE_LINE',
      'MULTI_LINE',
      'SINGLE_SELECT',
      'MULTI_SELECT',
      'PHOTO',
      'PHOTOS',
      'CHECKBOX',
      'RADIO',
      'PASSWORD',
      'EMAIL',
      'NUMBER',
      'DATE',
      'DATERANGE',
    ],
  })
  field_type: FieldType;

  @ApiProperty()
  app_id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
