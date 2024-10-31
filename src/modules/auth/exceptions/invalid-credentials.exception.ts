import { UnauthorizedException } from '@nestjs/common';

export const invalidCredentials = () =>
  new UnauthorizedException(`Invalid credentials.`);
