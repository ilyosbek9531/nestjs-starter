import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  Put,
  Request,
} from '@nestjs/common';
import { IUser, UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Role } from '@prisma/client';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signupUser(@Body() payload: CreateUserDto): Promise<IUser> {
    const existingUser = await this.userService.findOne({
      username: payload.username,
    });

    if (existingUser) {
      throw new BadRequestException();
    }

    return await this.userService.createUser(payload);
  }

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUser(
    @Request() req,
    @Body() body: UpdateUserDto,
  ): Promise<IUser> {
    const user = await this.userService.findOne({
      username: body.username,
    });
    if (!user) {
      throw new NotFoundException();
    }
    if (
      user.id !== req.user.id &&
      req.user.role !== Role.ADMIN &&
      req.user.role !== Role.SUPERUSER
    ) {
      throw new UnauthorizedException();
    }
    return await this.userService.updateUser({
      where: {
        username: body.username,
      },
      data: body,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERUSER)
  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<IUser> {
    const user = await this.userService.findOne({
      id: id,
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
