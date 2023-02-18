import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Artist } from '../artist/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      entities: [User, Artist],
      synchronize: true,
      migrationsRun: true,
      migrations: [],
    }),
  ],
})
export class DBModule {}
