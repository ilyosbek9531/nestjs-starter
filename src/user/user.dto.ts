import { Role } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}

export class UpdateUserDto extends CreateUserDto {}
