import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async findOne(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  public async create(user: User) {
    await this.userRepository.insert(user);
  }

  public async delete(user: User) {
    await this.userRepository.delete(user.id);
  }

  public async updatePassword(id: string, password: string): Promise<User> {
    await this.userRepository.update(id, { password });

    return this.findOne(id);
  }

  public async findOneByLogin(login: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ login });
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
    await this.userRepository.update(id, { refreshToken });
  }

  async findOneByIdAndRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<User> {
    return await this.userRepository.findOneByOrFail({ id, refreshToken });
  }
}
