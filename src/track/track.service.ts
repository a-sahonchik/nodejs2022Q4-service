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
    await this.checkIfTrackArtistExistsOrNull(createTrackDto.artistId);
    await this.checkIfTrackAlbumExistsOrNull(createTrackDto.albumId);

    const track = new Track(
      createTrackDto.name,
      createTrackDto.artistId,
      createTrackDto.albumId,
      createTrackDto.duration,
    );

    await this.trackRepository.create(track);

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.findOne(id);

    await this.checkIfTrackArtistExistsOrNull(updateTrackDto.artistId);
    await this.checkIfTrackAlbumExistsOrNull(updateTrackDto.albumId);

    return this.trackRepository.update(
      track.id,
      updateTrackDto.name,
      updateTrackDto.duration,
      updateTrackDto.artistId,
      updateTrackDto.albumId,
    );
  }

  async delete(id: string): Promise<void> {
    const track = await this.findOne(id);

    await this.trackRepository.delete(track);
  }

  private async checkIfTrackArtistExistsOrNull(
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

  private async checkIfTrackAlbumExistsOrNull(albumId: string): Promise<void> {
    if (albumId === null) {
      return;
    }

    const album = await this.albumRepository.findOne(albumId);

    if (album === null) {
      throw new BadRequestException(`Album with id ${albumId} is not found`);
    }
  }
}
