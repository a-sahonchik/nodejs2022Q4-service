import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTokenDTO {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
