import { User } from '../user/user.entity';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';

class DB {
  users: User[] = [];

  artists: Artist[] = [];

  albums: Album[] = [];

  tracks: Track[] = [];

  favorites: {
    artists: string[];
    albums: string[];
    tracks: string[];
  } = {
    artists: [],
    albums: [],
    tracks: [],
  };
}

export const db = new DB();
