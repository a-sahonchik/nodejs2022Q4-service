import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Response } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): User {
    return this.userService.findOne(id);
  }

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): User {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): User {
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  delete(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
    this.userService.delete(id);
    res.status(HttpStatus.NO_CONTENT).json([]);
  }
}
