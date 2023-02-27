import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  SetMetadata,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { UpdateTokenDTO } from './dto/update-token.dto';
import { User } from '../user/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Sign up' })
  async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.signup(createUserDto);
  }

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Log in' })
  @ApiOkResponse()
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @SetMetadata('refreshToken', true)
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @ApiOperation({ summary: 'Get new pair of access and refresh tokens' })
  @ApiOkResponse()
  @ApiBearerAuth('JWT')
  async refreshTokens(@Request() req, @Body() updateTokenDTO: UpdateTokenDTO) {
    return await this.authService.refreshTokens(req.user, updateTokenDTO);
  }
}
