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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './album.entity';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get single album by id' })
  @ApiBadRequestResponse({ description: 'Validation errors.' })
  @ApiNotFoundResponse({ description: 'Album not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Album {
    return this.albumService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of albums' })
  findAll(): Album[] {
    return this.albumService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create album' })
  @ApiBadRequestResponse({ description: 'Validation errors.' })
  create(@Body() createAlbumDto: CreateAlbumDto): Album {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update album' })
  @ApiBadRequestResponse({ description: 'Validation errors.' })
  @ApiNotFoundResponse({ description: 'Album not found.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Album {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete album' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Album deleted.' })
  @ApiBadRequestResponse({ description: 'Validation errors.' })
  @ApiNotFoundResponse({ description: 'Album not found.' })
  delete(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
    this.albumService.delete(id);
    res.status(HttpStatus.NO_CONTENT).json([]);
  }
}
