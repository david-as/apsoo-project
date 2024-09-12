import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DuplicateEmailException } from '../common/exceptions/duplicate-email.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserType } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.type === UserType.PERSON && !createUserDto.cpf) {
      throw new BadRequestException('CPF is required for PERSON type');
    }
    if (createUserDto.type === UserType.RESTAURANT && !createUserDto.cnpj) {
      throw new BadRequestException('CNPJ is required for RESTAURANT type');
    }

    const user = this.usersRepository.create(createUserDto);
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // PostgreSQL unique constraint violation error code
        throw new DuplicateEmailException(createUserDto.email);
      }
      throw error;
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findAllByType(type: UserType): Promise<User[]> {
    console.log('findAllByType', type);
    return this.usersRepository.find({ where: { type } });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
