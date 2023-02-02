import { Artist } from './artist.entity';

export class ArtistRepository {
  private readonly artists: Artist[] = [];

  public findAll() {
    return this.artists;
  }

  public findOne(id: string) {
    return this.artists.find((artist) => artist.getId() === id);
  }

  public create(artist: Artist) {
    this.artists.push(artist);
  }

  public delete(artist: Artist) {
    const index = this.artists.indexOf(artist);

    this.artists.splice(index, 1);
  }
}
