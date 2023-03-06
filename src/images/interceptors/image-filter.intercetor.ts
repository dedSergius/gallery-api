import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Roles } from 'src/auth/roles.enum';
import { User } from 'src/users/entities/user.entity';

interface UserRequest<T> extends Request {
  user: T;
  _filter: any;
}

@Injectable()
export class ImageFilterInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<UserRequest<User>>();
    if (!req.user.roles.find((r) => r == Roles.Admin)) {
      req._filter = {
        where: [{ owner: req.user.id }, { isPublic: true }],
      };
    }
    return next.handle();
  }
}
