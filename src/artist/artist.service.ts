import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistRepository } from './artist.repository';
import { Artist } from './artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  findOne(id: string): Artist {
    const artist = this.artistRepository.findOne(id);

    if (artist === undefined) {
      throw new NotFoundException(`Artist with id ${id} is not found`);
    }

    return artist;
  }

  findAll(): Artist[] {
    return this.artistRepository.findAll();
  }

  create(createArtistDto: CreateArtistDto): Artist {
    const artist = new Artist(createArtistDto.name, createArtistDto.grammy);

    this.artistRepository.create(artist);

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = this.artistRepository.findOne(id);

    if (artist === undefined) {
      throw new NotFoundException(`Artist with id ${id} is not found`);
    }

    artist.update(updateArtistDto.name, updateArtistDto.grammy);

    return artist;
  }

  delete(id: string): void {
    const artist = this.artistRepository.findOne(id);

    if (artist === undefined) {
      throw new NotFoundException(`Artist with id ${id} is not found`);
    }

    this.artistRepository.delete(artist);
  }
}
