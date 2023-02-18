import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'boolean' })
  grammy: boolean;

  constructor(name: string, grammy: boolean) {
    this.name = name;
    this.grammy = grammy;
  }
}
