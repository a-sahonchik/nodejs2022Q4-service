import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { ArtistService } from './artist.service';
import { Artist } from './artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get single artist by id' })
  @ApiBadRequestResponse({ description: 'Validation errors.' })
  @ApiNotFoundResponse({ description: 'Artist not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Artist {
    return this.artistService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of artists' })
  findAll(): Artist[] {
    return this.artistService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create artist' })
  @ApiBadRequestResponse({ description: 'Validation errors.' })
  create(@Body() createArtistDto: CreateArtistDto): Artist {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update artist' })
  @ApiBadRequestResponse({ description: 'Validation errors.' })
  @ApiNotFoundResponse({ description: 'Artist not found.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Artist {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete artist' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Artist deleted.' })
  @ApiBadRequestResponse({ description: 'Validation errors.' })
  @ApiNotFoundResponse({ description: 'Artist not found.' })
  delete(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
    this.artistService.delete(id);
    res.status(HttpStatus.NO_CONTENT).json([]);
  }
}
