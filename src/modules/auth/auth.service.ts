import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

import { UsersModel } from 'modules/users/users.model';
import { LoginWithUsernameDto } from './dtos/login-with-username.dto';
import { TokenService } from 'modules/token/token.service';
import { invalidCredentials } from './exceptions/invalid-credentials.exception';
import { UserDto } from 'modules/users/dtos/user.dto';
import { LoginWithEmailDto } from './dtos/login-with-email.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
    private readonly tokenService: TokenService,
  ) {}

  public async loginWithUsername(dto: LoginWithUsernameDto) {
    const user = await this.usersRepository.findOne({
      where: { username: dto.username },
    });

    if (!user) {
      throw invalidCredentials();
    }

    const isPasswordValid = await this.comparePassword(
      dto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw invalidCredentials();
    }

    const accessToken = await this.tokenService.signAccessToken(user.id);
    const refreshToken = await this.tokenService.signRefreshToken(user.id);

    return {
      user: plainToInstance(UserDto, user),
      accessToken,
      refreshToken,
    };
  }

  public async loginWithEmail(dto: LoginWithEmailDto) {
    const user = await this.usersRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw invalidCredentials();
    }

    const isPasswordValid = await this.comparePassword(
      dto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw invalidCredentials();
    }

    const accessToken = await this.tokenService.signAccessToken(user.id);
    const refreshToken = await this.tokenService.signRefreshToken(user.id);

    return {
      user: plainToInstance(UserDto, user),
      accessToken,
      refreshToken,
    };
  }

  public async refreshTokens(refreshToken: string) {
    const payload = await this.tokenService.verifyRefreshToken(refreshToken);

    if (!(payload instanceof UnauthorizedException)) {
      const user = await this.usersRepository.findOne({
        where: { id: payload.user_id },
      });
      const newAccessToken = await this.tokenService.signAccessToken(user.id);
      const newRefreshToken = await this.tokenService.signRefreshToken(user.id);

      return {
        newAccessToken,
        newRefreshToken,
      };
    }

    throw payload;
  }

  private async comparePassword(raw: string, encoded: string) {
    return await bcrypt.compare(raw, encoded);
  }
}
