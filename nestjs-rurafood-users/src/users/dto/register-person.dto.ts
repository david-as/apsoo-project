import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class RegisterPersonDto extends OmitType(CreateUserDto, [
  'type',
  'cnpj',
  'address',
  'cuisine',
] as const) {
  type = 'person' as const;
}
