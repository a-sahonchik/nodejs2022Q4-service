import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserRepository } from './user.repository';
import { compare, hash } from 'bcrypt';

const CRYPT_SALT = parseInt(process.env.CRYPT_SALT, 10);

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
    const hashedPassword = await hash(createUserDto.password, CRYPT_SALT);

    const user = new User(createUserDto.login, hashedPassword);

    await this.userRepository.create(user);

    return user;
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.findOne(id);

    const passwordsMatch = await compare(
      updatePasswordDto.oldPassword,
      user.password,
    );

    if (!passwordsMatch) {
      throw new ForbiddenException(`Old password is incorrect`);
    }

    return this.userRepository.updatePassword(
      id,
      await hash(updatePasswordDto.newPassword, CRYPT_SALT),
    );
  }

  async delete(id: string): Promise<void> {
    const user = await this.findOne(id);

    await this.userRepository.delete(user);
  }
}
