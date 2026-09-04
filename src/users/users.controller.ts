import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './create-user.dto.js';
import { AuthGuard } from './auth.guard.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('search')
  @UseGuards(AuthGuard)
  getUserSearch(
    @Query('name') name: string,
    @Query('age') age: string,
  ): string {
    return `User with name ${name} and age ${age}!`;
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update() {
    return 'User updated!';
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete() {
    return 'User deleted!';
  }
}
