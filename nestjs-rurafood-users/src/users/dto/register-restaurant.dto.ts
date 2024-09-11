import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class RegisterRestaurantDto extends OmitType(CreateUserDto, [
  'type',
  'cpf',
] as const) {
  type = 'restaurant' as const;
}
