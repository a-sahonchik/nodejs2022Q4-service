import { v4 as uuid } from 'uuid';

export class Track {
  private readonly id: string;
  private name: string;
  private artistId: string | null;
  private albumId: string | null;
  private duration: number;

  constructor(
    name: string,
    artistId: string | null,
    albumId: string | null,
    duration: number,
  ) {
    this.id = uuid();
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }

  public update(
    name: string,
    artistId: string | null,
    albumId: string | null,
    duration: number,
  ): void {
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }

  public getId(): string {
    return this.id;
  }
}
