import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from '../../track/track.entity';

@Entity()
export class FavoriteTrack {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => Track, null, { onDelete: 'CASCADE' })
  track: Track;

  constructor(track: Track) {
    this.track = track;
  }
}
