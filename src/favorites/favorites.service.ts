import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { TrackRepository } from '../track/track.repository';
import { AlbumRepository } from '../album/album.repository';
import { ArtistRepository } from '../artist/artist.repository';
import { FavoritesResponse } from './favorites.response';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly trackRepository: TrackRepository,
    private readonly albumRepository: AlbumRepository,
    private readonly artistRepository: ArtistRepository,
  ) {}

  findAll(): FavoritesResponse {
    const favorites = this.favoritesRepository.findAll();

    return {
      artists: favorites.artists.map((artistId) =>
        this.artistRepository.findOne(artistId),
      ),
      albums: favorites.albums.map((albumId) =>
        this.albumRepository.findOne(albumId),
      ),
      tracks: favorites.tracks.map((trackId) =>
        this.trackRepository.findOne(trackId),
      ),
    };
  }

  addTrack(id: string): void {
    if (this.favoritesRepository.isTrackInFavorites(id)) {
      throw new BadRequestException('Track is already in favorites');
    }

    if (this.trackRepository.findOne(id) === undefined) {
      throw new UnprocessableEntityException(
        `Track with id ${id} is not found`,
      );
    }

    this.favoritesRepository.addTrack(id);
  }

  deleteTrack(id: string): void {
    if (!this.favoritesRepository.isTrackInFavorites(id)) {
      throw new NotFoundException('Track is not in favorites');
    }

    this.favoritesRepository.deleteTrack(id);
  }

  addAlbum(id: string): void {
    if (this.favoritesRepository.isAlbumInFavorites(id)) {
      throw new BadRequestException('Album is already in favorites');
    }

    if (this.albumRepository.findOne(id) === undefined) {
      throw new UnprocessableEntityException(
        `Album with id ${id} is not found`,
      );
    }

    this.favoritesRepository.addAlbum(id);
  }

  deleteAlbum(id: string): void {
    if (!this.favoritesRepository.isAlbumInFavorites(id)) {
      throw new NotFoundException('Album is not in favorites');
    }

    this.favoritesRepository.deleteAlbum(id);
  }

  addArtist(id: string): void {
    if (this.favoritesRepository.isArtistInFavorites(id)) {
      throw new BadRequestException('Artist is already in favorites');
    }

    if (this.artistRepository.findOne(id) === undefined) {
      throw new UnprocessableEntityException(
        `Artist with id ${id} is not found`,
      );
    }

    this.favoritesRepository.addArtist(id);
  }

  deleteArtist(id: string): void {
    if (!this.favoritesRepository.isArtistInFavorites(id)) {
      throw new NotFoundException('Artist is not in favorites');
    }

    this.favoritesRepository.deleteArtist(id);
  }
}
