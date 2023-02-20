import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TrackRepository } from '../track/track.repository';
import { AlbumRepository } from '../album/album.repository';
import { ArtistRepository } from '../artist/artist.repository';
import { FavoritesResponse } from './favorites.response';
import { FavoriteAlbumRepository } from './album/favorite-album.repository';
import { FavoriteAlbum } from './album/favorite-album.entity';
import { FavoriteTrackRepository } from './track/favorite-track.repository';
import { FavoriteTrack } from './track/favorite-track.entity';
import { FavoriteArtistRepository } from './artist/favorite-artist.repository';
import { FavoriteArtist } from './artist/favorite-artist.entity';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly trackRepository: TrackRepository,
    private readonly albumRepository: AlbumRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly favoriteAlbumRepository: FavoriteAlbumRepository,
    private readonly favoriteTrackRepository: FavoriteTrackRepository,
    private readonly favoriteArtistRepository: FavoriteArtistRepository,
  ) {}

  async findAll(): Promise<FavoritesResponse> {
    return {
      artists: await this.artistRepository.findAllFavorite(),
      albums: await this.albumRepository.findAllFavorite(),
      tracks: await this.trackRepository.findAllFavorite(),
    };
  }

  async addTrack(id: string): Promise<void> {
    const track = await this.trackRepository.findOne(id);

    if (track === null) {
      throw new UnprocessableEntityException(
        `Track with id ${id} is not found`,
      );
    }

    if ((await this.favoriteTrackRepository.findByTrack(id)) !== null) {
      throw new BadRequestException('Track is already in favorites');
    }

    const favoriteTrack = new FavoriteTrack(track);

    await this.favoriteTrackRepository.create(favoriteTrack);
  }

  async deleteTrack(id: string): Promise<void> {
    const track = await this.trackRepository.findOne(id);

    if (track === null) {
      throw new NotFoundException(`Track with id ${id} is not found`);
    }

    const favoriteTrack = await this.favoriteTrackRepository.findByTrack(id);

    if (favoriteTrack === null) {
      throw new NotFoundException('Track is not in favorites');
    }

    await this.favoriteTrackRepository.delete(favoriteTrack);
  }

  async addAlbum(id: string): Promise<void> {
    const album = await this.albumRepository.findOne(id);

    if (album === null) {
      throw new UnprocessableEntityException(
        `Album with id ${id} is not found`,
      );
    }

    if ((await this.favoriteAlbumRepository.findByAlbum(id)) !== null) {
      throw new BadRequestException('Album is already in favorites');
    }

    const favoriteAlbum = new FavoriteAlbum(album);

    await this.favoriteAlbumRepository.create(favoriteAlbum);
  }

  async deleteAlbum(id: string): Promise<void> {
    const album = await this.albumRepository.findOne(id);

    if (album === null) {
      throw new NotFoundException(`Album with id ${id} is not found`);
    }

    const favoriteAlbum = await this.favoriteAlbumRepository.findByAlbum(id);

    if (favoriteAlbum === null) {
      throw new NotFoundException('Album is not in favorites');
    }

    await this.favoriteAlbumRepository.delete(favoriteAlbum);
  }

  async addArtist(id: string): Promise<void> {
    const artist = await this.artistRepository.findOne(id);

    if (artist === null) {
      throw new UnprocessableEntityException(
        `Artist with id ${id} is not found`,
      );
    }

    if ((await this.favoriteArtistRepository.findByArtist(id)) !== null) {
      throw new BadRequestException('Artist is already in favorites');
    }

    const favoriteArtist = new FavoriteArtist(artist);

    await this.favoriteArtistRepository.create(favoriteArtist);
  }

  async deleteArtist(id: string): Promise<void> {
    const artist = await this.artistRepository.findOne(id);

    if (artist === null) {
      throw new NotFoundException(`Artist with id ${id} is not found`);
    }

    const favoriteArtist = await this.favoriteArtistRepository.findByArtist(id);

    if (favoriteArtist === null) {
      throw new NotFoundException('Artist is not in favorites');
    }

    await this.favoriteArtistRepository.delete(favoriteArtist);
  }
}
