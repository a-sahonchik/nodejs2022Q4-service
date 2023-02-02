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

  findOne(id: string): Track {
    const track = this.trackRepository.findOne(id);

    if (track === undefined) {
      throw new NotFoundException(`Track with id ${id} is not found`);
    }

    return track;
  }

  findAll(): Track[] {
    return this.trackRepository.findAll();
  }

  create(createTrackDto: CreateTrackDto): Track {
    this.checkIfTrackArtistExistsOrNull(createTrackDto.artistId);
    this.checkIfTrackAlbumExistsOrNull(createTrackDto.albumId);

    const track = new Track(
      createTrackDto.name,
      createTrackDto.artistId,
      createTrackDto.albumId,
      createTrackDto.duration,
    );

    this.trackRepository.create(track);

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this.trackRepository.findOne(id);

    if (track === undefined) {
      throw new NotFoundException(`Track with id ${id} is not found`);
    }

    this.checkIfTrackArtistExistsOrNull(updateTrackDto.artistId);
    this.checkIfTrackAlbumExistsOrNull(updateTrackDto.albumId);

    track.update(
      updateTrackDto.name,
      updateTrackDto.artistId,
      updateTrackDto.albumId,
      updateTrackDto.duration,
    );

    return track;
  }

  delete(id: string): void {
    const track = this.trackRepository.findOne(id);

    if (track === undefined) {
      throw new NotFoundException(`Track with id ${id} is not found`);
    }

    this.trackRepository.delete(track);
  }

  private checkIfTrackArtistExistsOrNull(artistId: string): void {
    if (artistId === null) {
      return;
    }

    const artist = this.artistRepository.findOne(artistId);

    if (artist === undefined) {
      throw new BadRequestException(`Artist with id ${artistId} is not found`);
    }
  }

  private checkIfTrackAlbumExistsOrNull(albumId: string): void {
    if (albumId === null) {
      return;
    }

    const album = this.albumRepository.findOne(albumId);

    if (album === undefined) {
      throw new BadRequestException(`Album with id ${albumId} is not found`);
    }
  }
}
