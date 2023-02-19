import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { FavoritesRepository } from './favorites.repository';
import { ArtistRepository } from '../artist/artist.repository';
import { TrackRepository } from '../track/track.repository';
import { AlbumRepository } from '../album/album.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Album, Track])],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    FavoritesRepository,
    ArtistRepository,
    TrackRepository,
    AlbumRepository,
  ],
})
export class FavoritesModule {}
