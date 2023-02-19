import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../../album/album.entity';

@Entity()
export class FavoriteAlbum {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => Album, null, { onDelete: 'CASCADE' })
  album: Album;

  constructor(album: Album) {
    this.album = album;
  }
}
