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

  public async findOne(id: string): Promise<User | undefined> {
    try {
      return await this.userRepository.findOneByOrFail({ id });
    } catch {
      return undefined;
    }
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
}
