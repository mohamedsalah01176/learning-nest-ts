import { RoleSystem } from "../decorators/roles/roles.enums.js"

export interface IUser{
    id?:number,
    name?:string,
    email?:string
}

export interface JWTPayload{
    id?:number,
    name?:string,
    email?:string
    role:RoleSystem
}