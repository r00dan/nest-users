import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'modules/users/dtos/user.dto';
import { UsersModel } from 'modules/users/users.model';

@Injectable()
export class AdminGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const isAdmin = this.validateRequest(request);

    if (!isAdmin) {
      throw new ForbiddenException(`Not allowed.`);
    }

    return isAdmin;
  }

  private validateRequest(request: Request): boolean {
    return (request.user as UsersModel).role === Roles.ADMIN;
  }
}
