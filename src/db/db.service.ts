import { User } from '../user/user.entity';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';

class DB {
  users: User[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
}

export const db = new DB();
