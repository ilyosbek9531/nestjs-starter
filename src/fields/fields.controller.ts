import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FieldsService } from './fields.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { FieldEntity } from './entities/field.entity';

@Controller('fields')
@ApiTags('Fields')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERUSER)
  @ApiCreatedResponse({ type: FieldEntity })
  create(@Body() createFieldDto: CreateFieldDto) {
    return this.fieldsService.create(createFieldDto);
  }

  @Get()
  @ApiOkResponse({ type: FieldEntity, isArray: true })
  findAll() {
    return this.fieldsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: FieldEntity })
  findOne(@Param('id') id: string) {
    return this.fieldsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERUSER)
  @ApiOkResponse({ type: FieldEntity })
  update(@Param('id') id: string, @Body() updateFieldDto: UpdateFieldDto) {
    return this.fieldsService.update(id, updateFieldDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERUSER)
  @ApiOkResponse({ type: FieldEntity })
  remove(@Param('id') id: string) {
    return this.fieldsService.remove(id);
  }
}
