import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';
import { FavoriteAlbum } from '../favorites/album/favorite-album.entity';
import { FavoriteArtist } from '../favorites/artist/favorite-artist.entity';
import { FavoriteTrack } from '../favorites/track/favorite-track.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      entities: [
        User,
        Artist,
        Album,
        Track,
        FavoriteAlbum,
        FavoriteArtist,
        FavoriteTrack,
      ],
      synchronize: true,
      migrationsRun: true,
      migrations: [],
    }),
  ],
})
export class DBModule {}
