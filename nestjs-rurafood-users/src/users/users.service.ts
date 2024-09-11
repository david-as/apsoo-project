import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { ApiConfigService } from '../shared/services/api-config.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterPersonDto } from './dto/register-person.dto';
import { RegisterRestaurantDto } from './dto/register-restaurant.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ApiConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, createUserDto);
    user.password = await this.hashPassword(createUserDto.password);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, updateUserDto);
    if (updateUserDto.password) {
      user.password = await this.hashPassword(updateUserDto.password);
    }
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findAllPersons(): Promise<User[]> {
    return this.usersRepository.find({ where: { type: 'person' } });
  }

  async findAllRestaurants(): Promise<User[]> {
    return this.usersRepository.find({ where: { type: 'restaurant' } });
  }

  async registerPerson(registerPersonDto: RegisterPersonDto): Promise<User> {
    const user = new User();
    Object.assign(user, registerPersonDto);
    user.password = await this.hashPassword(registerPersonDto.password);
    return this.usersRepository.save(user);
  }

  async registerRestaurant(
    registerRestaurantDto: RegisterRestaurantDto,
  ): Promise<User> {
    const user = new User();
    Object.assign(user, registerRestaurantDto);
    user.password = await this.hashPassword(registerRestaurantDto.password);
    return this.usersRepository.save(user);
  }
}
