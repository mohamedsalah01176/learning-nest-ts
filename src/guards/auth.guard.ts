import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ForbiddenException } from '../exceptions/forbidden.exception.js';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request =context.switchToHttp().getRequest();

    if(!request.user){
      throw new ForbiddenException();
    }
    return !!request.user;
  }
}
