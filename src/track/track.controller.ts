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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './track.entity';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get single track by id' })
  @ApiBadRequestResponse({ description: 'Validation errors.' })
  @ApiNotFoundResponse({ description: 'Track not found.' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Track> {
    return this.trackService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of tracks' })
  async findAll(): Promise<Track[]> {
    return this.trackService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create track' })
  @ApiBadRequestResponse({ description: 'Validation errors.' })
  async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track' })
  @ApiBadRequestResponse({ description: 'Validation errors.' })
  @ApiNotFoundResponse({ description: 'Track not found.' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete track' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Track deleted.' })
  @ApiBadRequestResponse({ description: 'Validation errors.' })
  @ApiNotFoundResponse({ description: 'Track not found.' })
  async delete(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
    await this.trackService.delete(id);
    res.status(HttpStatus.NO_CONTENT).json([]);
  }
}
