import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteAlbum } from './favorite-album.entity';

export class FavoriteAlbumRepository {
  constructor(
    @InjectRepository(FavoriteAlbum)
    private favoriteAlbumRepository: Repository<FavoriteAlbum>,
  ) {}

  public async findAll(): Promise<FavoriteAlbum[]> {
    return this.favoriteAlbumRepository.find();
  }

  public async findOne(id: string): Promise<FavoriteAlbum | null> {
    return await this.favoriteAlbumRepository.findOneBy({ id });
  }

  public async create(favoriteAlbum: FavoriteAlbum): Promise<void> {
    await this.favoriteAlbumRepository.insert(favoriteAlbum);
  }

  public async delete(favoriteAlbum: FavoriteAlbum): Promise<void> {
    await this.favoriteAlbumRepository.delete(favoriteAlbum.id);
  }

  public async findByAlbum(albumId: string): Promise<FavoriteAlbum | null> {
    return this.favoriteAlbumRepository
      .createQueryBuilder('fa')
      .select('fa')
      .innerJoin('album', 'a', 'a.id = fa.albumId')
      .where('a.id = :albumId', { albumId })
      .getOne();
  }
}
