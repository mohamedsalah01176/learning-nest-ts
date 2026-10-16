import { Injectable, NestMiddleware , HttpStatus} from '@nestjs/common';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: () => void) {

    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
      return res.status(HttpStatus.UNAUTHORIZED).json({message:"unauthorized"});
    }

    const decode=jwt.verify(token,process.env.JWT_SECRET as string);
    req["user"]=decode;


    next(); 
  }
}


// export function AuthMiddlewareFunction(req: Request, res: Response, next: () => void){
//   if(!req.headers.authorization){
//       return res.status(HttpStatus.UNAUTHORIZED).json({message:"unauthorized"})
//     }
//     next();
// }