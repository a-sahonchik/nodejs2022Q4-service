import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';
import { Expose, Transform } from 'class-transformer';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @ManyToOne(() => Artist, null, { onDelete: 'SET NULL', eager: true })
  @Expose({ name: 'artistId' })
  @Transform(({ value }) => (value ? value.id : null))
  artist: Artist | null;

  @ManyToOne(() => Album, null, { onDelete: 'SET NULL', eager: true })
  @Expose({ name: 'albumId' })
  @Transform(({ value }) => (value ? value.id : null))
  album: Album | null;

  constructor(
    name: string,
    duration: number,
    artist: Artist | null,
    album: Album | null,
  ) {
    this.name = name;
    this.duration = duration;
    this.artist = artist;
    this.album = album;
  }
}
