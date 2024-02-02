import { ApiProperty } from '@nestjs/swagger';
import { App } from '@prisma/client';

export class AppEntity implements App {
  @ApiProperty()
  id: string;

  @ApiProperty()
  app_name: string;

  @ApiProperty()
  app_slug: string;

  @ApiProperty()
  app_icon: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
