import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((_album, artistId) => artistId !== null)
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  artistId: string | null;

  @ValidateIf((_album, albumId) => albumId !== null)
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  duration: number;
}
