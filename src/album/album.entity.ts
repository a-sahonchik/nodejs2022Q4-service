import { v4 as uuid } from 'uuid';

export class Album {
  private readonly id: string;
  private name: string;
  private year: number;
  private artistId: string | null;

  constructor(name: string, year: number, artistId: string | null) {
    this.id = uuid();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }

  public update(name: string, year: number, artistId: string | null): void {
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }

  public getId(): string {
    return this.id;
  }
}
