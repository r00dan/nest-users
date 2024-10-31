import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginWithUsernameDto } from './dtos/login-with-username.dto';
import { HTTP_ONLY_COOKIE_OPTIONS } from 'core/config/cookie.config';
import { GetCookies } from 'core/decorators/get-cookies.decorator';
import { LoginWithEmailDto } from './dtos/login-with-email.dto';

@ApiTags('[public] auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login/username')
  public async loginWithUsername(
    @Body() dto: LoginWithUsernameDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.loginWithUsername(dto);

    response.cookie('refresh', refreshToken, HTTP_ONLY_COOKIE_OPTIONS).send({
      accessToken,
      user,
    });
  }

  @Post('/login/email')
  public async loginWithEmail(
    @Body() dto: LoginWithEmailDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.loginWithEmail(dto);

    response.cookie('refresh', refreshToken, HTTP_ONLY_COOKIE_OPTIONS).send({
      accessToken,
      user,
    });
  }

  @Get('/refresh')
  public async refreshTokens(
    @GetCookies('refresh') oldRefreshToken: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { newAccessToken, newRefreshToken } =
      await this.authService.refreshTokens(oldRefreshToken);

    response.cookie('refresh', newRefreshToken, HTTP_ONLY_COOKIE_OPTIONS).send({
      newAccessToken,
    });
  }
}
