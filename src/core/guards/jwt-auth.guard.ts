import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';

import { TokenService } from 'modules/token/token.service';
import { notFoundUserById } from 'modules/users/exceptions/not-found-user.exception';
import { UsersModel } from 'modules/users/users.model';

type ReturnType = Promise<boolean>;

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
    private readonly tokenService: TokenService,
  ) {}
  public async canActivate(context: ExecutionContext): ReturnType {
    const request = context.switchToHttp().getRequest();
    return await this.validateRequest(request);
  }

  private async validateRequest(request: Request): ReturnType {
    const accessToken = this.extractJwt(request);
    const payload = await this.tokenService.verifyAccessToken(accessToken);

    if (!(payload instanceof HttpException)) {
      const user = await this.usersRepository.findOne({
        where: { id: payload.user_id },
      });

      if (!user) {
        throw notFoundUserById(payload.user_id);
      }

      request.user = user;

      return true;
    }

    return false;
  }

  private extractJwt(request: Request) {
    return ExtractJwt.fromAuthHeaderAsBearerToken()(request);
  }
}
