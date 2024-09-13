import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUserAndGenerateToken(
    email: string,
    password: string,
  ): Promise<string | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    console.log('12313', user, email, password)
    // Check if user exists (password validation removed)
    if (user) {
      const payload = { email: user.email, sub: user.id };
      return this.jwtService.sign(payload);
    }
    return null;
  }
}
