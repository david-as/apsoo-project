import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';
import { UserType } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password: string;

  @IsNotEmpty({ message: 'User type is required' })
  @IsEnum(UserType, { message: 'Invalid user type' })
  type: UserType;

  @ValidateIf((o) => o.type === UserType.PERSON)
  @IsNotEmpty({ message: 'CPF is required for PERSON type' })
  @IsString({ message: 'CPF must be a string' })
  cpf?: string;

  @ValidateIf((o) => o.type === UserType.RESTAURANT)
  @IsNotEmpty({ message: 'CNPJ is required for RESTAURANT type' })
  @IsString({ message: 'CNPJ must be a string' })
  cnpj?: string;
}
