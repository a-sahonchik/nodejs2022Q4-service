import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumRepository } from './album.repository';
import { ArtistRepository } from '../artist/artist.repository';
import { FavoritesRepository } from '../favorites/favorites.repository';
import { TrackRepository } from '../track/track.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Artist } from '../artist/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Album])],
  controllers: [AlbumController],
  providers: [
    AlbumService,
    AlbumRepository,
    ArtistRepository,
    FavoritesRepository,
    TrackRepository,
  ],
})
export class AlbumModule {}
