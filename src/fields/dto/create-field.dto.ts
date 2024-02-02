import { ApiProperty } from '@nestjs/swagger';
import { FieldType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateFieldDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  field_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  field_slug: string;

  @IsEnum(FieldType)
  @IsNotEmpty()
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

  @IsUUID('4', { message: 'Please provide a valid UUID for category_id' })
  @IsNotEmpty()
  @ApiProperty()
  app_id: string;
}
