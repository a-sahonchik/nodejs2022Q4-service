import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../artist/artist.entity';
import { Expose, Transform } from 'class-transformer';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, null, { onDelete: 'SET NULL', eager: true })
  @Expose({ name: 'artistId' })
  @Transform(({ value }) => (value ? value.id : null))
  artist: Artist | null;

  constructor(name: string, year: number, artist: Artist | null) {
    this.name = name;
    this.year = year;
    this.artist = artist;
  }
}
