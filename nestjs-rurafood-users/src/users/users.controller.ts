import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterPersonDto } from './dto/register-person.dto';
import { RegisterRestaurantDto } from './dto/register-restaurant.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register/person')
  @ApiOperation({ summary: 'Register a new person' })
  @ApiResponse({
    status: 201,
    description: 'The person has been successfully created.',
    type: User,
  })
  registerPerson(@Body() registerPersonDto: RegisterPersonDto) {
    return this.usersService.registerPerson(registerPersonDto);
  }

  @Post('register/restaurant')
  @ApiOperation({ summary: 'Register a new restaurant' })
  @ApiResponse({
    status: 201,
    description: 'The restaurant has been successfully created.',
    type: User,
  })
  registerRestaurant(@Body() registerRestaurantDto: RegisterRestaurantDto) {
    return this.usersService.registerRestaurant(registerRestaurantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users (both persons and restaurants)' })
  @ApiResponse({ status: 200, description: 'Return all users.', type: [User] })
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Get('persons')
  @ApiOperation({ summary: 'Get all persons' })
  @ApiResponse({
    status: 200,
    description: 'Return all persons.',
    type: [User],
  })
  findAllPersons() {
    return this.usersService.findAllPersons();
  }

  @Get('restaurants')
  @ApiOperation({ summary: 'Get all restaurants' })
  @ApiResponse({
    status: 200,
    description: 'Return all restaurants.',
    type: [User],
  })
  findAllRestaurants() {
    return this.usersService.findAllRestaurants();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'Return the user.', type: User })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: User,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
