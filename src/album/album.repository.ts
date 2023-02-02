import { Album } from './album.entity';
import { db } from '../db/db.service';

export class AlbumRepository {
  public findAll() {
    return db.albums;
  }

  public findOne(id: string) {
    return db.albums.find((album) => album.getId() === id);
  }

  public create(album: Album) {
    db.albums.push(album);
  }

  public delete(album: Album) {
    const index = db.albums.indexOf(album);

    db.albums.splice(index, 1);
  }
}
