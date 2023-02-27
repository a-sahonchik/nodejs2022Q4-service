import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRepository } from '../../user/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;

      const bearer = authHeader?.split(' ')[0];
      const refreshToken = authHeader?.split(' ')[1];

      const user = this.jwtService.verify(refreshToken);

      req.user = await this.userRepository.findOneByIdAndRefreshToken(
        user.id,
        refreshToken,
      );

      if (
        bearer !== 'Bearer' ||
        !refreshToken ||
        req.body.refreshToken !== refreshToken ||
        req.user.refreshToken !== refreshToken
      ) {
        throw new UnauthorizedException({ message: 'Invalid refresh token' });
      }
    } catch (error) {
      throw new UnauthorizedException({ message: 'Invalid refresh token' });
    }

    return true;
  }
}
