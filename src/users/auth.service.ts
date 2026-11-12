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
import { ForgetPasswordDTO } from './dto/forget-password-user.dto.js';
import { ResetPasswordDTO } from './dto/restpasswor-users.dto.js';



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

       
        const verficationToken = await this.generateRandomToken();
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
                const newVerficationToken =await this.generateRandomToken();
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

    async handleforgetPassword(body:ForgetPasswordDTO){

        const user = await this.userRespository.findOne({where:{email:body.email}});
        if(!user) throw new BadRequestException("Email Not Found");

        const resetPasswordToken = await this.generateRandomToken();

        user.resetpasswordToken =resetPasswordToken;

        await this.userRespository.save(user);


        return await this.mailServive.sendResetPasswordEmail(user.email,user.id,resetPasswordToken);
        
    }

    async handleResetPassword(userId:number,resetpasswordToken:string,body:ResetPasswordDTO){
        const user = await this.userRespository.findOne({where:{id:userId}});
        if(!user) throw new BadRequestException("Email Not Found");

        if(user.resetpasswordToken !== resetpasswordToken) throw new BadRequestException("Link Invalid");

        const newPassword = await this.generateHashPassword(body.newpassword);

        user.password = newPassword;
        user.resetpasswordToken="";

        await this.userRespository.save(user);


        return{message:"Password Saved Successfully"};
    }

    public async generateHashPassword(password:string){

        return await bcrypt.hash(password,Number(process.env.BCRYPT_SALT_ROUNDS))
    }
 
    private async generateJWT(payload:JWTPayload):Promise<string>{
        return await this.jwtSefrvice.sign(payload)
    }

    private async generateRandomToken(){
        return randomBytes(32).toString('hex');
    }

}
