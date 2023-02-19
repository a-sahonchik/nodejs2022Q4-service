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

  async findOne(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findOne(id);

    if (artist === undefined) {
      throw new NotFoundException(`Artist with id ${id} is not found`);
    }

    return artist;
  }

  async findAll(): Promise<Artist[]> {
    return this.artistRepository.findAll();
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = new Artist(createArtistDto.name, createArtistDto.grammy);

    await this.artistRepository.create(artist);

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.findOne(id);

    return this.artistRepository.update(
      artist.id,
      updateArtistDto.name,
      updateArtistDto.grammy,
    );
  }

  async delete(id: string): Promise<void> {
    const artist = await this.findOne(id);

    if (this.favoritesRepository.isArtistInFavorites(id)) {
      this.favoritesRepository.deleteArtist(id);
    }

    const artistTracks = await this.trackRepository.findAllByArtistId(id);

    artistTracks.forEach((track: Track) =>
      this.trackRepository.setTrackArtistToNull(track.id),
    );

    const artistAlbums = await this.albumRepository.findAllByArtistId(id);

    artistAlbums.forEach((album: Album) =>
      this.albumRepository.setAlbumArtistToNull(album.id),
    );

    await this.artistRepository.delete(artist);
  }
}
