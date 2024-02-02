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
  Request,
  Patch,
  Delete,
} from '@nestjs/common';
import { IUser, UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '@prisma/client';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('User')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN, Role.SUPERUSER)
  @ApiCreatedResponse({ type: UserEntity })
  async signupUser(@Body() payload: CreateUserDto): Promise<IUser> {
    // const existingUser = await this.userService.findOne({
    //   username: payload.username,
    // });
    // console.log('existingUser', existingUser);

    // // if (existingUser) {
    // //   throw new BadRequestException();
    // // }

    return await this.userService.createUser(payload);
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Patch()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERUSER)
  @ApiOkResponse({ type: UserEntity })
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

  @Get('/:id')
  @ApiOkResponse({ type: UserEntity })
  async getUserById(@Param('id') id: string): Promise<IUser> {
    const user = await this.userService.findOne({
      id: id,
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERUSER)
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id') id: string): Promise<IUser> {
    return this.userService.deleteUser(id);
  }
}
