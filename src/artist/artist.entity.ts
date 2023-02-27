import { v4 as uuid } from 'uuid';

export class Artist {
  private readonly id: string;
  private name: string;
  private grammy: boolean;

  constructor(name: string, grammy: boolean) {
    this.id = uuid();
    this.name = name;
    this.grammy = grammy;
  }

  public update(name: string, grammy: boolean): void {
    this.name = name;
    this.grammy = grammy;
  }

  public getId(): string {
    return this.id;
  }
}
