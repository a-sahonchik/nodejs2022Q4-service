import { User } from './user.entity';

export class UserRepository {
  private readonly users: User[] = [];

  public findAll() {
    return this.users;
  }

  public findOne(id: string) {
    return this.users.find((user) => user.getId() === id);
  }

  public create(user: User) {
    this.users.push(user);
  }

  public delete(user: User) {
    const index = this.users.indexOf(user);

    this.users.splice(index, 1);
  }
}
