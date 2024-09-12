import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.validateUserAndGenerateToken(
      loginDto.email,
      loginDto.password,
    );
    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { token };
  }
}
