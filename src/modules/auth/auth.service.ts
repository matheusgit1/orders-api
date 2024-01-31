import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const users = [
  {
    id: 1,
    username: 'Matheus',
    password: '123456',
  },
  {
    id: 1,
    username: 'John',
    password: '123456',
  },
  {
    id: 1,
    username: 'Chris',
    password: '123456',
  },
];

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(username: string, password: string) {
    const user = users.find(
      (u) => u.username === username && u.password === password,
    );
    if (!user) {
      throw new UnauthorizedException('usuario não identificado');
    }

    const payload = {
      sub: user.id,
      username: username,
    };

    const accessToken = this.jwtService.sign(payload);
    return {
      access_token: accessToken,
    };
  }
}
