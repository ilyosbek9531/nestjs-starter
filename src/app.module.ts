import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AppsModule } from './apps/apps.module';
import { PrismaService } from './prisma/prisma.service';
import { FieldsModule } from './fields/fields.module';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot(), AppsModule, FieldsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
