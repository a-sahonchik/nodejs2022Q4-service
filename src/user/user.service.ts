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

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (user === null) {
      throw new NotFoundException(`User with id ${id} is not found`);
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User(createUserDto.login, createUserDto.password);

    await this.userRepository.create(user);

    return user;
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.findOne(id);

    if (updatePasswordDto.oldPassword !== user.password) {
      throw new ForbiddenException(`Old password is incorrect`);
    }

    return this.userRepository.updatePassword(
      id,
      updatePasswordDto.newPassword,
    );
  }

  async delete(id: string): Promise<void> {
    const user = await this.findOne(id);

    await this.userRepository.delete(user);
  }
}
