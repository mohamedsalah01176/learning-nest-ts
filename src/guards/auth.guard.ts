import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import {JwtService} from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config";
import { JWTPayload } from "../users/interfaces.js";


@Injectable()
export class AuthGuard implements CanActivate{

  constructor(
    private readonly jwtService:JwtService ,
    private readonly configService:ConfigService
  ){}

  async canActivate(context:ExecutionContext){
    const request:any = context.switchToHttp().getRequest();

    const [type,token]=request.headers.authorization?.split(" ") ?? []

    if(!type || !token) throw new UnauthorizedException("access denied, not token provided");

    try{

      const payload : JWTPayload=await this.jwtService.verifyAsync(token,{secret:this.configService.get<string>("JWT_SECRET")});
      request.user = payload;
      return true

    }catch(errors){
      throw new UnauthorizedException("access denied, invalid token");
    }
  }

}