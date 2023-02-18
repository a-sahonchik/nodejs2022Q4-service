import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of favorites' })
  async findAll(): Promise<FavoritesResponse> {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiCreatedResponse({ description: 'Track added to favorites.' })
  @ApiBadRequestResponse({ description: 'Validation errors.' })
  @ApiUnprocessableEntityResponse({ description: 'Track not found.' })
  addTrack(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.addTrack(id);
    res
      .status(HttpStatus.CREATED)
      .json(`Track with id ${id} added to favorites`);
  }

  @Delete('track/:id')
  @ApiOperation({ summary: 'Remove track from favorites' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Track deleted from favorites.' })
  @ApiBadRequestResponse({ description: 'Validation errors.' })
  @ApiNotFoundResponse({ description: 'Track is not in favorites.' })
  deleteTrack(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.deleteTrack(id);
    res.status(HttpStatus.NO_CONTENT).json([]);
  }

  @Post('album/:id')
  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiCreatedResponse({ description: 'Album added to favorites.' })
  @ApiBadRequestResponse({ description: 'Validation errors.' })
  @ApiUnprocessableEntityResponse({ description: 'Album not found.' })
  addAlbum(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.addAlbum(id);
    res
      .status(HttpStatus.CREATED)
      .json(`Album with id ${id} added to favorites`);
  }

  @Delete('album/:id')
  @ApiOperation({ summary: 'Remove album from favorites' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Album deleted from favorites.' })
  @ApiBadRequestResponse({ description: 'Validation errors.' })
  @ApiNotFoundResponse({ description: 'Album is not in favorites.' })
  deleteAlbum(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.deleteAlbum(id);
    res.status(HttpStatus.NO_CONTENT).json([]);
  }

  @Post('artist/:id')
  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiCreatedResponse({ description: 'Artist added to favorites.' })
  @ApiBadRequestResponse({ description: 'Validation errors.' })
  @ApiUnprocessableEntityResponse({ description: 'Artist not found.' })
  addArtist(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.addArtist(id);
    res
      .status(HttpStatus.CREATED)
      .json(`Artist with id ${id} added to favorites`);
  }

  @Delete('artist/:id')
  @ApiOperation({ summary: 'Remove artist from favorites' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Artist deleted from favorites.' })
  @ApiBadRequestResponse({ description: 'Validation errors.' })
  @ApiNotFoundResponse({ description: 'Artist is not in favorites.' })
  deleteArtist(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.deleteArtist(id);
    res.status(HttpStatus.NO_CONTENT).json([]);
  }
}
