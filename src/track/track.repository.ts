import { Track } from './track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class TrackRepository {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  public async findAll(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  public async findOne(id: string): Promise<Track | undefined> {
    try {
      return await this.trackRepository.findOneByOrFail({ id });
    } catch {
      return undefined;
    }
  }

  public async findAllByAlbumId(albumId: string): Promise<Track[]> {
    return this.trackRepository.findBy({ albumId });
  }

  public async findAllByArtistId(artistId: string): Promise<Track[]> {
    return this.trackRepository.findBy({ artistId });
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
    artistId: string,
    albumId: string,
  ): Promise<Track> {
    await this.trackRepository.update(id, {
      name,
      duration,
      artistId,
      albumId,
    });

    return this.findOne(id);
  }

  public async setTrackArtistToNull(id: string): Promise<void> {
    await this.trackRepository.update(id, { artistId: null });
  }

  public async setTrackAlbumToNull(id: string): Promise<void> {
    await this.trackRepository.update(id, { albumId: null });
  }
}
