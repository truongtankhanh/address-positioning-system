import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseFormattingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const formattedData = {
          status: context.switchToHttp().getResponse().statusCode,
          time: new Date().toLocaleString(),
          response: data,
        };
        return formattedData;
      }),
    );
  }
}
