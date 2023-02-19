import { Album } from './album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class AlbumRepository {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  public async findAll(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  public async findOne(id: string): Promise<Album | null> {
    return await this.albumRepository.findOneBy({ id });
  }

  public async findAllByArtistId(artistId: string): Promise<Album[]> {
    return this.albumRepository.findBy({ artistId });
  }

  public async create(album: Album): Promise<void> {
    await this.albumRepository.insert(album);
  }

  public async delete(album: Album): Promise<void> {
    await this.albumRepository.delete(album.id);
  }

  public async update(
    id: string,
    name: string,
    year: number,
    artistId: string,
  ): Promise<Album> {
    await this.albumRepository.update(id, { name, year, artistId });

    return this.findOne(id);
  }

  public async setAlbumArtistToNull(id: string): Promise<void> {
    await this.albumRepository.update(id, { artistId: null });
  }

  public async findAllFavorite(): Promise<Album[]> {
    return this.albumRepository
      .createQueryBuilder('a')
      .select('a')
      .innerJoin('favorite_album', 'fa', 'fa.albumId = a.id')
      .getMany();
  }
}
