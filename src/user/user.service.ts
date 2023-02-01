import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findOne(id: string): User {
    const user = this.userRepository.findOne(id);

    if (user === undefined) {
      throw new NotFoundException(`User with id ${id} is not found`);
    }

    return user;
  }

  findAll(): User[] {
    return this.userRepository.findAll();
  }

  create(createUserDto: CreateUserDto): User {
    const user = new User(createUserDto.login, createUserDto.password);

    this.userRepository.create(user);

    return user;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const user = this.userRepository.findOne(id);

    if (user === undefined) {
      throw new NotFoundException(`User with id ${id} is not found`);
    }

    if (updatePasswordDto.oldPassword !== user.getPassword()) {
      throw new ForbiddenException(`Old password is incorrect`);
    }

    user.updatePassword(updatePasswordDto.newPassword);

    return user;
  }

  delete(id: string): void {
    const user = this.userRepository.findOne(id);

    if (user === undefined) {
      throw new NotFoundException(`User with id ${id} is not found`);
    }

    this.userRepository.delete(user);
  }
}
