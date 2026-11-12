import { Injectable, RequestTimeoutException , BadRequestException , NotFoundException, ForbiddenException } from '@nestjs/common';
import {  JWTPayload } from './interfaces.js';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcryptjs';
import { LoginUserDTO } from './dto/login.dto.js';
import {JwtService} from "@nestjs/jwt"
import { MailService } from '../mail/mail.service.js';
import { randomBytes } from 'crypto';



@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private readonly userRespository:Repository<User>,
        private readonly jwtSefrvice:JwtService,
        private readonly mailServive:MailService,
    ){}
    

    async Register(body:CreateUserDTO){
        const {email ,password ,name}=body;

        const foundUserInDatabase= await this.userRespository.findOne({where:{email}});

        if (foundUserInDatabase){ throw new BadRequestException("User Already exist ")};

       
        const verficationToken = await this.generateVerficationToken();
        const newUser= await this.userRespository.save({
            email,
            password:await this.generateHashPassword(password) ,
            name,
            verficationToken
        })



        return await this.mailServive.sendVerificationEmail(newUser.email,newUser.id,verficationToken);

    }


    async login(body:LoginUserDTO){

        const {email,password}=body;

        const user=await this.userRespository.findOne({where:{email}});
        if(!user) throw new BadRequestException("Email or password incorrect");
        
        if(!user.isActive){
            let verificationToken=user.verificationToken;

            if(!user.verificationToken){
                const newVerficationToken =await this.generateVerficationToken();
                user.verificationToken=newVerficationToken;
                await this.userRespository.save(user);
                verificationToken=newVerficationToken;
            }

            return await this.mailServive.sendVerificationEmail(email,user.id,verificationToken);
        }

        const comparePassword = await bcrypt.compare(password,user.password);
        if(!comparePassword) throw new BadRequestException("Email or password incorrect");

        const accessToken = await this.generateJWT({
            id: user.id,
            name: user.name,
            email: user.email,
            role:user.role,
        });
        try{

            await this.mailServive.sendLoginEmail(user.email)
        }catch(error){
            throw new RequestTimeoutException(error)
        }
       return {accessToken}
    }

    async checkVerificationToken(userId:number,verficationToken:string){
        const user = await this.userRespository.findOne({
                where: { id: userId }
            });

        if(user?.verificationToken !== verficationToken ) throw new BadRequestException("Link Invalid");
        
        user.isActive=true;
        user.verificationToken="";
        await this.userRespository.save(user);
        return{ message:"Email Verfied Successfully, you can go to login"}
    }

    public async generateHashPassword(password:string){

        return await bcrypt.hash(password,Number(process.env.BCRYPT_SALT_ROUNDS))
    }
 
    private async generateJWT(payload:JWTPayload):Promise<string>{
        return await this.jwtSefrvice.sign(payload)
    }

    private async generateVerficationToken(){
        return randomBytes(32).toString('hex');
    }

}
