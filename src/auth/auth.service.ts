import { Injectable } from '@nestjs/common';
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
    const isPasswordMatch = await bcrypt.compare(pass, user.password);
    if (isPasswordMatch) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
