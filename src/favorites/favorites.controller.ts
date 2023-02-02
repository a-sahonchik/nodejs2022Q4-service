import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './favorites.response';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll(): FavoritesResponse {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  addTrack(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.addTrack(id);
    res
      .status(HttpStatus.CREATED)
      .json(`Track with id ${id} added to favorites`);
  }

  @Delete('track/:id')
  deleteTrack(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.deleteTrack(id);
    res.status(HttpStatus.NO_CONTENT).json([]);
  }

  @Post('album/:id')
  addAlbum(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.addAlbum(id);
    res
      .status(HttpStatus.CREATED)
      .json(`Album with id ${id} added to favorites`);
  }

  @Delete('album/:id')
  deleteAlbum(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.deleteAlbum(id);
    res.status(HttpStatus.NO_CONTENT).json([]);
  }

  @Post('artist/:id')
  addArtist(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.addArtist(id);
    res
      .status(HttpStatus.CREATED)
      .json(`Artist with id ${id} added to favorites`);
  }

  @Delete('artist/:id')
  deleteArtist(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.deleteArtist(id);
    res.status(HttpStatus.NO_CONTENT).json([]);
  }
}
