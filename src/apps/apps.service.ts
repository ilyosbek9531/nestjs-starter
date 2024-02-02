import { Injectable } from '@nestjs/common';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppsService {
  constructor(private prisma: PrismaService) {}

  create(createAppDto: CreateAppDto) {
    return this.prisma.app.create({ data: createAppDto });
  }

  findAll() {
    return this.prisma.app.findMany({
      include: {
        fields: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.app.findUnique({ where: { id } });
  }

  update(id: string, updateAppDto: UpdateAppDto) {
    return this.prisma.app.update({ where: { id }, data: updateAppDto });
  }

  remove(id: string) {
    return this.prisma.app.delete({ where: { id } });
  }
}
