import { User } from './user.entity';
import { db } from '../db/db.service';

export class UserRepository {
  public findAll() {
    return db.users;
  }

  public findOne(id: string) {
    return db.users.find((user) => user.getId() === id);
  }

  public create(user: User) {
    db.users.push(user);
  }

  public delete(user: User) {
    const index = db.users.indexOf(user);

    db.users.splice(index, 1);
  }
}
