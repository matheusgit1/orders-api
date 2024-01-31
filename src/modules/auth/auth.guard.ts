import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeaders(request);

    if (!token) {
      throw new UnauthorizedException('token invalido ou inexistente');
    }

    try {
      const payload = this.jwtService.verify(token);
      request['user'] = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException(
        'você não tem permissão para acessar esse recurso',
      );
    }
  }

  private extractTokenFromHeaders(request: Request) {
    if (!request.headers['authorization']) {
      throw new UnauthorizedException(
        'você não tem permissão para acessar esse recurso',
      );
    }
    const [type, token] = request.headers['authorization'].split(' ') ?? [];
    return type.trim() === 'Bearer' ? token.trim() : undefined;
  }
}
