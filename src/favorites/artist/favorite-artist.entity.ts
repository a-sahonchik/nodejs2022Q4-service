import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artist/artist.entity';

@Entity()
export class FavoriteArtist {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => Artist, null, { onDelete: 'CASCADE' })
  artist: Artist;

  constructor(artist: Artist) {
    this.artist = artist;
  }
}
