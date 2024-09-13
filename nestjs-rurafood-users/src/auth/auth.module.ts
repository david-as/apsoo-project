import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Ensure User entity is imported
    JwtModule.register({
      secret: 'your_secret_key', // Replace with your actual secret
      signOptions: { expiresIn: '60s' }, // Optional: token expiration
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService], // Ensure AuthService is listed here
  exports: [AuthService], // Optional: export if used in other modules
})
export class AuthModule {}
