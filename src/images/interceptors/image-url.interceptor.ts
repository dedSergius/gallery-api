import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ImageUrlInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const request = context.switchToHttp().getRequest();
        const url = request.protocol + '://' + request.get('host');

        if (Array.isArray(data)) {
          data = data.map((item) => {
            return { ...item, url: `${url}/img/${item.id}` };
          });
        } else if (typeof data === 'object') {
          data = { ...data, url: `${url}/img/${data.id}` };
        }

        return data;
      }),
    );
  }
}
