import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../modules/auth/auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard(new JwtService())).toBeDefined();
  });
});
