import { db } from '../db/db.service';
import { Track } from './track.entity';

export class TrackRepository {
  public findAll() {
    return db.tracks;
  }

  public findOne(id: string): Track | undefined {
    return db.tracks.find((track) => track.getId() === id);
  }

  public findAllByAlbumId(albumId: string): Track[] | [] {
    return db.tracks.filter((track) => track.getAlbumId() === albumId);
  }

  public findAllByArtistId(artistId: string): Track[] | [] {
    return db.tracks.filter((track) => track.getArtistId() === artistId);
  }

  public create(track: Track) {
    db.tracks.push(track);
  }

  public delete(track: Track) {
    const index = db.tracks.indexOf(track);

    db.tracks.splice(index, 1);
  }
}
