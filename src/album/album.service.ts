import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumRepository } from './album.repository';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './album.entity';
import { ArtistRepository } from '../artist/artist.repository';
import { Artist } from '../artist/artist.entity';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly artistRepository: ArtistRepository,
  ) {}

  async findOne(id: string): Promise<Album> {
    const album = await this.albumRepository.findOne(id);

    if (album === null) {
      throw new NotFoundException(`Album with id ${id} is not found`);
    }

    return album;
  }

  async findAll(): Promise<Album[]> {
    return this.albumRepository.findAll();
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const artist = await this.getAlbumArtistFromDto(createAlbumDto.artistId);

    const album = new Album(createAlbumDto.name, createAlbumDto.year, artist);

    await this.albumRepository.create(album);

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.findOne(id);

    const artist = await this.getAlbumArtistFromDto(updateAlbumDto.artistId);

    return this.albumRepository.update(
      album.id,
      updateAlbumDto.name,
      updateAlbumDto.year,
      artist,
    );
  }

  async delete(id: string): Promise<void> {
    const album = await this.findOne(id);

    await this.albumRepository.delete(album);
  }

  private async getAlbumArtistFromDto(
    artistId: string,
  ): Promise<Artist | null> {
    if (artistId === null) {
      return null;
    }

    const artist = await this.artistRepository.findOne(artistId);

    if (artist === null) {
      throw new BadRequestException(`Artist with id ${artistId} is not found`);
    }

    return artist;
  }
}
