import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';

export class ArtistRepository {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  public async findAll(): Promise<Artist[]> {
    return this.artistRepository.find();
  }

  public async findOne(id: string): Promise<Artist | undefined> {
    try {
      return await this.artistRepository.findOneByOrFail({ id });
    } catch {
      return undefined;
    }
  }

  public async create(artist: Artist) {
    await this.artistRepository.insert(artist);
  }

  public async delete(artist: Artist) {
    await this.artistRepository.delete(artist.id);
  }

  public async update(
    id: string,
    name: string,
    grammy: boolean,
  ): Promise<Artist> {
    await this.artistRepository.update(id, { name, grammy });

    return this.findOne(id);
  }
}
