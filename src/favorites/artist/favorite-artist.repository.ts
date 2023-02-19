import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteArtist } from './favorite-artist.entity';
import { Artist } from '../../artist/artist.entity';

export class FavoriteArtistRepository {
  constructor(
    @InjectRepository(FavoriteArtist)
    private favoriteArtistRepository: Repository<FavoriteArtist>,
  ) {}

  public async findAll(): Promise<FavoriteArtist[]> {
    return this.favoriteArtistRepository.find();
  }

  public async findOne(artist: Artist): Promise<FavoriteArtist | null> {
    return await this.favoriteArtistRepository.findOneBy({ artist });
  }

  public async create(favoriteArtist: FavoriteArtist): Promise<void> {
    await this.favoriteArtistRepository.insert(favoriteArtist);
  }

  public async delete(favoriteArtist: FavoriteArtist): Promise<void> {
    await this.favoriteArtistRepository.delete(favoriteArtist.id);
  }

  public async findByArtist(artistId: string): Promise<FavoriteArtist | null> {
    return this.favoriteArtistRepository
      .createQueryBuilder('fa')
      .select('fa')
      .innerJoin('artist', 'a', 'a.id = fa.artistId')
      .where('a.id = :artistId', { artistId })
      .getOne();
  }
}
