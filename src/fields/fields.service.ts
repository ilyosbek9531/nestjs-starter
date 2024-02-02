import { Injectable } from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FieldsService {
  constructor(private prisma: PrismaService) {}

  create(createFieldDto: CreateFieldDto) {
    return this.prisma.field.create({ data: createFieldDto });
  }

  findAll() {
    return this.prisma.field.findMany();
  }

  findOne(id: string) {
    return this.prisma.field.findUnique({ where: { id } });
  }

  update(id: string, updateFieldDto: UpdateFieldDto) {
    return this.prisma.field.update({ where: { id }, data: updateFieldDto });
  }

  remove(id: string) {
    return this.prisma.field.delete({ where: { id } });
  }
}
