import { Artist } from './artist.entity';
import { db } from '../db/db.service';

export class ArtistRepository {
  public findAll() {
    return db.artists;
  }

  public findOne(id: string) {
    return db.artists.find((artist) => artist.getId() === id);
  }

  public create(artist: Artist) {
    db.artists.push(artist);
  }

  public delete(artist: Artist) {
    const index = db.artists.indexOf(artist);

    db.artists.splice(index, 1);
  }
}
