import { Track } from './track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity';

export class TrackRepository {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  public async findAll(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  public async findOne(id: string): Promise<Track | null> {
    return await this.trackRepository.findOneBy({ id });
  }

  public async create(track: Track): Promise<void> {
    await this.trackRepository.insert(track);
  }

  public async delete(track: Track): Promise<void> {
    await this.trackRepository.delete(track.id);
  }

  public async update(
    id: string,
    name: string,
    duration: number,
    artist: Artist,
    album: Album,
  ): Promise<Track> {
    await this.trackRepository.update(id, {
      name,
      duration,
      artist,
      album,
    });

    return this.findOne(id);
  }

  public async findAllFavorite(): Promise<Track[]> {
    return this.trackRepository
      .createQueryBuilder('t')
      .select('t')
      .addSelect(['tar', 'tal'])
      .leftJoin('t.artist', 'tar')
      .leftJoin('t.album', 'tal')
      .innerJoin('favorite_track', 'ft', 'ft.trackId = t.id')
      .getMany();
  }
}
