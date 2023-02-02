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

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly artistRepository: ArtistRepository,
  ) {}

  findOne(id: string): Album {
    const album = this.albumRepository.findOne(id);

    if (album === undefined) {
      throw new NotFoundException(`Album with id ${id} is not found`);
    }

    return album;
  }

  findAll(): Album[] {
    return this.albumRepository.findAll();
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    this.checkIfAlbumArtistExistsOrNull(createAlbumDto.artistId);

    const album = new Album(
      createAlbumDto.name,
      createAlbumDto.year,
      createAlbumDto.artistId,
    );

    this.albumRepository.create(album);

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = this.findOne(id);

    this.checkIfAlbumArtistExistsOrNull(updateAlbumDto.artistId);

    album.update(
      updateAlbumDto.name,
      updateAlbumDto.year,
      updateAlbumDto.artistId,
    );

    return album;
  }

  delete(id: string): void {
    const album = this.findOne(id);

    this.albumRepository.delete(album);
  }

  private checkIfAlbumArtistExistsOrNull(artistId: string): void {
    if (artistId === null) {
      return;
    }

    const artist = this.artistRepository.findOne(artistId);

    if (artist === undefined) {
      throw new BadRequestException(`Artist with id ${artistId} is not found`);
    }
  }
}
