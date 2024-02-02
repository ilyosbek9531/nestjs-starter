import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user: User = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) throw new NotFoundException('User not found');
    const isPasswordMatch = await bcrypt.compare(pass, user.password);

    if (isPasswordMatch) {
      delete user.password;
      return user;
    } else throw new ForbiddenException('Password is wrong');
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
