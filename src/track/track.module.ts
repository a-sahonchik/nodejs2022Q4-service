import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TrackRepository } from './track.repository';
import { ArtistRepository } from '../artist/artist.repository';
import { AlbumRepository } from '../album/album.repository';
import { FavoritesRepository } from '../favorites/favorites.repository';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    TrackRepository,
    ArtistRepository,
    AlbumRepository,
    FavoritesRepository,
  ],
})
export class TrackModule {}
