import { db } from '../db/db.service';

export class FavoritesRepository {
  public findAll() {
    return db.favorites;
  }

  public isTrackInFavorites(id: string) {
    return db.favorites.tracks.includes(id);
  }

  public addTrack(id: string) {
    db.favorites.tracks.push(id);
  }

  public deleteTrack(id: string) {
    const index = db.favorites.tracks.indexOf(id);

    db.favorites.tracks.splice(index, 1);
  }

  public isAlbumInFavorites(id: string) {
    return db.favorites.albums.includes(id);
  }

  public addAlbum(id: string) {
    db.favorites.albums.push(id);
  }

  public deleteAlbum(id: string) {
    const index = db.favorites.albums.indexOf(id);

    db.favorites.albums.splice(index, 1);
  }

  public isArtistInFavorites(id: string) {
    return db.favorites.artists.includes(id);
  }

  public addArtist(id: string) {
    db.favorites.artists.push(id);
  }

  public deleteArtist(id: string) {
    const index = db.favorites.artists.indexOf(id);

    db.favorites.artists.splice(index, 1);
  }
}
