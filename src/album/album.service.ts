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
import { TrackRepository } from '../track/track.repository';
import { Track } from '../track/track.entity';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly trackRepository: TrackRepository,
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
    await this.checkIfAlbumArtistExistsOrNull(createAlbumDto.artistId);

    const album = new Album(
      createAlbumDto.name,
      createAlbumDto.year,
      createAlbumDto.artistId,
    );

    await this.albumRepository.create(album);

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.findOne(id);

    await this.checkIfAlbumArtistExistsOrNull(updateAlbumDto.artistId);

    return this.albumRepository.update(
      album.id,
      updateAlbumDto.name,
      updateAlbumDto.year,
      updateAlbumDto.artistId,
    );
  }

  async delete(id: string): Promise<void> {
    const album = await this.findOne(id);

    const albumTracks = await this.trackRepository.findAllByAlbumId(id);

    albumTracks.forEach((track: Track) =>
      this.trackRepository.setTrackAlbumToNull(track.id),
    );

    await this.albumRepository.delete(album);
  }

  private async checkIfAlbumArtistExistsOrNull(
    artistId: string,
  ): Promise<void> {
    if (artistId === null) {
      return;
    }

    const artist = await this.artistRepository.findOne(artistId);

    if (artist === null) {
      throw new BadRequestException(`Artist with id ${artistId} is not found`);
    }
  }
}
