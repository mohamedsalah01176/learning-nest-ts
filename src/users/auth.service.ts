import { Injectable, BadRequestException , NotFoundException, ForbiddenException } from '@nestjs/common';
import {  JWTPayload } from './interfaces.js';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcryptjs';
import { LoginUserDTO } from './dto/login.dto.js';
import {JwtService} from "@nestjs/jwt"



@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private readonly userRespository:Repository<User>,
        private readonly jwtSefrvice:JwtService
    ){}
    

    async Register(body:CreateUserDTO):Promise<{accessToken:string}>{
        const {email ,password ,name}=body;

        const foundUserInDatabase= await this.userRespository.findOne({where:{email}});

        if (foundUserInDatabase){ throw new BadRequestException("User Already exist ")};

       
        const newUser= await this.userRespository.save({
            email,
            password:await this.generateHashPassword(password) ,
            name
        })

        const accessToken= await this.generateJWT({id:newUser.id,name:newUser.name,email:newUser.email,role:newUser.role});

        return {accessToken}

    }


    async login(body:LoginUserDTO):Promise<{accessToken:string}>{

        const {email,password}=body;

        const user=await this.userRespository.findOne({where:{email}});
        if(!user) throw new BadRequestException("Email or password incorrect");
        
        const comparePassword = await bcrypt.compare(password,user.password);
        if(!comparePassword) throw new BadRequestException("Email or password incorrect");

        const accessToken = await this.generateJWT({
            id: user.id,
            name: user.name,
            email: user.email,
            role:user.role
        });
       return {accessToken}
    }

    public async generateHashPassword(password:string){

        return await bcrypt.hash(password,Number(process.env.BCRYPT_SALT_ROUNDS))
    }
 
    private async generateJWT(payload:JWTPayload):Promise<string>{
        return await this.jwtSefrvice.sign(payload)
    }

}
