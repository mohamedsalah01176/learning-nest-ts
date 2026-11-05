// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Observable } from 'rxjs';
// import { Roles } from '../decorators/roles/roles.decorator.js';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector:Reflector){}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
    
//     const roles= this.reflector.get(Roles,context.getHandler())

//     if(!roles){
//       return false;
//     }

    
//     const request = context.switchToHttp().getRequest();
//     return roles.includes(request.user.role);
//   }
// }


import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UsersService } from "../users/users.service.js";
import { Roles } from "../decorators/roles/roles.decorator.js";


@Injectable()
export class RolesGuard implements CanActivate{

  constructor(
    private readonly reflactor:Reflector,
    private readonly usersService:UsersService
  ){}
  async canActivate(context: ExecutionContext)  {
    const roles =this.reflactor.get(Roles,context.getHandler());
    const req=context.switchToHttp().getRequest();

    const reqUser=req["user"]
    
    if(!roles || roles.length === 0) return false

    const user= await this.usersService.getInformationOfUser(reqUser);

    if(!user) return false;
    if(!roles.includes(user.role)) return false

    return true
  }
}