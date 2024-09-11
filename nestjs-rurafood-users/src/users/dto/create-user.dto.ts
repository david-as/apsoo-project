import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe', description: 'The username of the user' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: 'person',
    description: 'The type of user (person or restaurant)',
  })
  @IsNotEmpty()
  @IsEnum(['person', 'restaurant'])
  type: 'person' | 'restaurant';

  @ApiProperty({
    example: '12345678901',
    description: 'The CPF of the person (if type is person)',
  })
  @IsOptional()
  @IsString()
  cpf?: string;

  @ApiProperty({
    example: '12345678901234',
    description: 'The CNPJ of the restaurant (if type is restaurant)',
  })
  @IsOptional()
  @IsString()
  cnpj?: string;

  @ApiProperty({
    example: '123 Main St, City, State',
    description: 'The address of the restaurant (if type is restaurant)',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: 'Italian',
    description: 'The cuisine type of the restaurant (if type is restaurant)',
  })
  @IsOptional()
  @IsString()
  cuisine?: string;
}
