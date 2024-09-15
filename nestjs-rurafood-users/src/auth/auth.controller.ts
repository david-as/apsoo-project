import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() request: Request) {
    const email = loginDto.email || request.body.email;
    const password = loginDto.password || request.body.password;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const result = await this.authService.validateUserAndGenerateToken(
      email,
      password,
    );

    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return result; // This should now return { user: User, token: string }
  }
}
