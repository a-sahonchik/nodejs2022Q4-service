import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { ArtistRepository } from '../artist/artist.repository';
import { TrackRepository } from '../track/track.repository';
import { AlbumRepository } from '../album/album.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';
import { FavoriteAlbum } from './album/favorite-album.entity';
import { FavoriteArtist } from './artist/favorite-artist.entity';
import { FavoriteTrack } from './track/favorite-track.entity';
import { FavoriteAlbumRepository } from './album/favorite-album.repository';
import { FavoriteArtistRepository } from './artist/favorite-artist.repository';
import { FavoriteTrackRepository } from './track/favorite-track.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Artist,
      Album,
      Track,
      FavoriteAlbum,
      FavoriteArtist,
      FavoriteTrack,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    ArtistRepository,
    TrackRepository,
    AlbumRepository,
    FavoriteAlbumRepository,
    FavoriteArtistRepository,
    FavoriteTrackRepository,
  ],
})
export class FavoritesModule {}
