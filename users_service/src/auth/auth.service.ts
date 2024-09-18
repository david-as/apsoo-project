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
  ): Promise<{ token: string; user: User } | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      const payload = { email: user.email, sub: user.id };
      return { token: this.jwtService.sign(payload), user: user };
    }
    return null;
  }
}
