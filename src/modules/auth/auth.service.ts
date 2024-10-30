import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private async comparePassword(raw: string, encoded: string) {
    return await bcrypt.compare(raw, encoded);
  }
}
