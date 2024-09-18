import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

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
