import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserType } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed',
  })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists',
  })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      person: {
        value: {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          type: UserType.PERSON,
          cpf: '123.456.789-00',
        },
      },
      restaurant: {
        value: {
          name: 'Tasty Restaurant',
          email: 'tasty@example.com',
          password: 'password456',
          type: UserType.RESTAURANT,
          cnpj: '12.345.678/0001-90',
        },
      },
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users (both restaurants and persons)' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          email: { type: 'string' },
          type: { type: 'string', enum: ['PERSON', 'RESTAURANT'] },
          cpf: { type: 'string', nullable: true },
          cnpj: { type: 'string', nullable: true },
        },
      },
    },
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('restaurants')
  @ApiOperation({ summary: 'Get all restaurant users' })
  @ApiResponse({
    status: 200,
    description: 'List of all restaurant users',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          email: { type: 'string' },
          type: { type: 'string', enum: ['RESTAURANT'] },
          cnpj: { type: 'string' },
        },
      },
    },
  })
  findAllRestaurants() {
    return this.usersService.findAllByType(UserType.RESTAURANT);
  }

  @Get('persons')
  @ApiOperation({ summary: 'Get all person users' })
  @ApiResponse({
    status: 200,
    description: 'List of all person users',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          email: { type: 'string' },
          type: { type: 'string', enum: ['PERSON'] },
          cpf: { type: 'string' },
        },
      },
    },
  })
  findAllPersons() {
    return this.usersService.findAllByType(UserType.PERSON);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'The found user',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string' },
        type: { type: 'string', enum: ['PERSON', 'RESTAURANT'] },
        cpf: { type: 'string', nullable: true },
        cnpj: { type: 'string', nullable: true },
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiBody({
    type: UpdateUserDto,
    examples: {
      person: {
        value: {
          name: 'Updated John Doe',
          email: 'updated.john@example.com',
        },
      },
      restaurant: {
        value: {
          name: 'Updated Tasty Restaurant',
          email: 'updated.tasty@example.com',
        },
      },
    },
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiResponse({ status: 204, description: 'User successfully deleted' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
