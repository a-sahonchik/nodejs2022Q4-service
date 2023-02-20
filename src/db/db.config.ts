import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';
import { FavoriteAlbum } from '../favorites/album/favorite-album.entity';
import { FavoriteArtist } from '../favorites/artist/favorite-artist.entity';
import { FavoriteTrack } from '../favorites/track/favorite-track.entity';
import { DataSourceOptions } from 'typeorm';

const databaseConfig: TypeOrmModuleOptions & DataSourceOptions = {
  type: 'postgres',
  url: process.env.DB_URL,
  username: 'postgres',
  password: 'postgres',
  entities: [
    User,
    Artist,
    Album,
    Track,
    FavoriteAlbum,
    FavoriteArtist,
    FavoriteTrack,
  ],
  synchronize: false,
  migrations: [__dirname + '/migrations/*.ts'],
};

export { databaseConfig };
