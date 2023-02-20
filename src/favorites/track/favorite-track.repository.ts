import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteTrack } from './favorite-track.entity';

export class FavoriteTrackRepository {
  constructor(
    @InjectRepository(FavoriteTrack)
    private favoriteTrackRepository: Repository<FavoriteTrack>,
  ) {}

  public async findAll(): Promise<FavoriteTrack[]> {
    return this.favoriteTrackRepository.find();
  }

  public async findOne(id: string): Promise<FavoriteTrack | null> {
    return await this.favoriteTrackRepository.findOneBy({ id });
  }

  public async create(favoriteTrack: FavoriteTrack): Promise<void> {
    await this.favoriteTrackRepository.insert(favoriteTrack);
  }

  public async delete(favoriteTrack: FavoriteTrack): Promise<void> {
    await this.favoriteTrackRepository.delete(favoriteTrack.id);
  }

  public async findByTrack(trackId: string): Promise<FavoriteTrack | null> {
    return this.favoriteTrackRepository
      .createQueryBuilder('ft')
      .select('ft')
      .innerJoin('track', 't', 't.id = ft.trackId')
      .where('t.id = :trackId', { trackId })
      .getOne();
  }
}
