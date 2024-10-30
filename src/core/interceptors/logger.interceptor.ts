import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, url } = context.switchToHttp().getRequest<Request>();
    const currentDate = new Date();
    console.log(`${currentDate.toISOString()} request: ${method} ${url}`);

    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(`${new Date().toISOString()} response: ${method} ${url}`),
        ),
      )
      .pipe(
        tap(() =>
          console.log(
            `Processing time: ${Date.now() - currentDate.getTime()} ms`,
          ),
        ),
      );
  }
}
