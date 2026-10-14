import { Injectable, NestMiddleware , HttpStatus} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {

    if(!req.headers.authorization){
      return res.status(HttpStatus.UNAUTHORIZED).json({message:"unauthorized"})
    }
    next();
  }
}


// export function AuthMiddlewareFunction(req: Request, res: Response, next: () => void){
//   if(!req.headers.authorization){
//       return res.status(HttpStatus.UNAUTHORIZED).json({message:"unauthorized"})
//     }
//     next();
// }