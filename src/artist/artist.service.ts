import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistRepository } from './artist.repository';
import { Artist } from './artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FavoritesRepository } from '../favorites/favorites.repository';
import { TrackRepository } from '../track/track.repository';
import { AlbumRepository } from '../album/album.repository';
import { Track } from '../track/track.entity';
import { Album } from '../album/album.entity';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly favoritesRepository: FavoritesRepository,
    private readonly trackRepository: TrackRepository,
    private readonly albumRepository: AlbumRepository,
  ) {}

  findOne(id: string): Artist {
    const artist = this.artistRepository.findOne(id);

    if (artist === undefined) {
      throw new NotFoundException(`Artist with id ${id} is not found`);
    }

    return artist;
  }

  findAll(): Artist[] {
    return this.artistRepository.findAll();
  }

  create(createArtistDto: CreateArtistDto): Artist {
    const artist = new Artist(createArtistDto.name, createArtistDto.grammy);

    this.artistRepository.create(artist);

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = this.findOne(id);

    artist.update(updateArtistDto.name, updateArtistDto.grammy);

    return artist;
  }

  delete(id: string): void {
    const artist = this.findOne(id);

    if (this.favoritesRepository.isArtistInFavorites(id)) {
      this.favoritesRepository.deleteArtist(id);
    }

    this.trackRepository
      .findAllByArtistId(id)
      .forEach((track: Track) => track.setArtistToNull());

    this.albumRepository
      .findAllByArtistId(id)
      .forEach((album: Album) => album.setArtistToNull());

    this.artistRepository.delete(artist);
  }
}
