import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserRepository } from '../user/user.repository';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UpdateTokenDTO } from './dto/update-token.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async signup(createUserDTO: CreateUserDto) {
    return await this.userService.create(createUserDTO);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto);

    return this.getTokens(user.id, user.login);
  }

  private async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOneByLogin(loginUserDto.login);

    const passwordsMatch = await compare(loginUserDto.password, user.password);

    if (user && passwordsMatch) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Invalid credentials' });
  }

  async getTokens(userId: string, login: string) {
    const payload = { userId, login };

    return {
      accessToken: await this.getAccessToken(payload),
      refreshToken: await this.getRefreshToken(payload),
    };
  }

  async getAccessToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
  }

  async getRefreshToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });
  }

  async refreshTokens(updateTokenDTO: UpdateTokenDTO) {
    try {
      const { userId, login } = await this.jwtService.verify(
        updateTokenDTO.refreshToken,
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        },
      );

      return this.getTokens(userId, login);
    } catch (err) {
      throw new ForbiddenException({ message: 'Invalid refresh token' });
    }
  }
}
