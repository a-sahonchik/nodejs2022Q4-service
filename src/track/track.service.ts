import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TrackRepository } from './track.repository';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ArtistRepository } from '../artist/artist.repository';
import { Track } from './track.entity';
import { AlbumRepository } from '../album/album.repository';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';

@Injectable()
export class TrackService {
  constructor(
    private readonly trackRepository: TrackRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly albumRepository: AlbumRepository,
  ) {}

  async findOne(id: string): Promise<Track> {
    const track = await this.trackRepository.findOne(id);

    if (track === null) {
      throw new NotFoundException(`Track with id ${id} is not found`);
    }

    return track;
  }

  async findAll(): Promise<Track[]> {
    return this.trackRepository.findAll();
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const artist = await this.getTrackArtistFromDto(createTrackDto.artistId);
    const album = await this.getTrackAlbumFromDto(createTrackDto.albumId);

    const track = new Track(
      createTrackDto.name,
      createTrackDto.duration,
      artist,
      album,
    );

    await this.trackRepository.create(track);

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.findOne(id);

    const artist = await this.getTrackArtistFromDto(updateTrackDto.artistId);
    const album = await this.getTrackAlbumFromDto(updateTrackDto.albumId);

    return this.trackRepository.update(
      track.id,
      updateTrackDto.name,
      updateTrackDto.duration,
      artist,
      album,
    );
  }

  async delete(id: string): Promise<void> {
    const track = await this.findOne(id);

    await this.trackRepository.delete(track);
  }

  private async getTrackArtistFromDto(
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

  private async getTrackAlbumFromDto(albumId: string): Promise<Album | null> {
    if (albumId === null) {
      return null;
    }

    const album = await this.albumRepository.findOne(albumId);

    if (album === null) {
      throw new BadRequestException(`Album with id ${albumId} is not found`);
    }

    return album;
  }
}
