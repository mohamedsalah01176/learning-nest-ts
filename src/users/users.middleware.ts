import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {

    console.log("From middleware")
    next();
  }
}
