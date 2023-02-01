import { Exclude } from 'class-transformer';
import { v4 as uuid } from 'uuid';

const DEFAULT_VERSION = 1;

export class User {
  private readonly id: string;
  private login: string;
  private version: number;
  private createdAt: number;
  private updatedAt: number;

  @Exclude()
  private password: string;

  constructor(login: string, password: string) {
    this.id = uuid();
    this.login = login;
    this.password = password;
    this.version = DEFAULT_VERSION;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  public updatePassword(newPassword: string): void {
    this.password = newPassword;
    this.version += 1;
    this.updatedAt = Date.now();
  }

  public getId(): string {
    return this.id;
  }

  public getPassword(): string {
    return this.password;
  }
}
