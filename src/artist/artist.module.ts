import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistRepository } from './artist.repository';
import { FavoritesRepository } from '../favorites/favorites.repository';
import { TrackRepository } from '../track/track.repository';
import { AlbumRepository } from '../album/album.repository';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    ArtistRepository,
    FavoritesRepository,
    TrackRepository,
    AlbumRepository,
  ],
})
export class ArtistModule {}
