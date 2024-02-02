import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAppDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  app_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  app_slug: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  app_icon: string;
}
