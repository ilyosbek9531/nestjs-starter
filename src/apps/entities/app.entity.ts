import { App } from '@prisma/client';

export class AppEntity implements App {
  id: string;
  app_name: string;
  app_slug: string;
  app_icon: string;
  createdAt: Date;
  updatedAt: Date;
}
