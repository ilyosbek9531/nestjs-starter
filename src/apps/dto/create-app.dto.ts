import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAppDto {
  @IsString()
  @IsNotEmpty()
  app_name: string;

  @IsString()
  @IsNotEmpty()
  app_slug: string;

  @IsString()
  @IsNotEmpty()
  app_icon: string;
}
