import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    const refreshToken = this.reflector.get<boolean>(
      'refreshToken',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;

      const bearer = authHeader?.split(' ')[0];
      const token = authHeader?.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Invalid auth token 1' });
      }

      let user: unknown;

      if (refreshToken) {
        user = this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        });
      } else {
        user = this.jwtService.verify(token);
      }

      req.user = user;
    } catch (error) {
      throw new UnauthorizedException({ message: 'Invalid auth token 2' });
    }

    return true;
  }
}
