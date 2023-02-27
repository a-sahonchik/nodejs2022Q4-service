import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  login: string;

  @VersionColumn()
  private version: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value.getTime(), { toPlainOnly: true })
  private createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value.getTime(), { toPlainOnly: true })
  private updatedAt: Date;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column({ nullable: true })
  refreshToken: string | null;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }
}
