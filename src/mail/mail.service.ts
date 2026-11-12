import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService:MailerService,
        private readonly configService:ConfigService
    ){}

    async sendLoginEmail(email:string){
        const today=new Date();
        await this.mailerService.sendMail({
            to:email,
            from:"<no-reply@my-nestjs-app.com>",
            subject: 'Welcome to My NestJS App',
            html: `
                <div style="font-family: Arial; padding: 20px;">
                    <h2>Welcome!</h2>
                    <p>Your account has been created successfully.</p>
                    <p>Thank you for joining us.</p>
                </div>
            `
        })
    }

    async sendVerificationEmail(email:string,userId:number,verficationToken:string){
        const baseUrl = this.configService.get<string>('DOMAIN');
        const verificationUrl= `${baseUrl}/api/users/verfiy-email/${userId}/${verficationToken}`
        
        await this.mailerService.sendMail({
            to:email,
            from:"<no-reply@my-nestjs-app.com>",
            subject: 'Welcome to My NestJS App',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                <h2>Welcome to My NestJS App!</h2>
                <p>Thank you for registering. Please verify your email address by clicking the button below.</p>

                <a 
                    href="${verificationUrl}"
                    style="
                        display: inline-block;
                        padding: 12px 24px;
                        background-color: #007bff;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                    "
                >
                    Verify Email
                </a>

                <p>If you didn't create an account, you can ignore this email.</p>
            </div>
            `
        })

        return {message:"Verification email sent successfully, Please Verfiy Your Email"}
    }


    async sendResetPasswordEmail(email:string,userId:number,verficationToken:string){
        const baseUrl = this.configService.get<string>('DOMAIN');
        const RessetPasswordUrl= `${baseUrl}/reset-password/${userId}/${verficationToken}`
        
        await this.mailerService.sendMail({
            to:email,
            from:"<no-reply@my-nestjs-app.com>",
            subject: 'Welcome to My NestJS App',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                <h2>Welcome to My NestJS App!</h2>
                <p>Thank you for registering. Please verify your email address by clicking the button below.</p>

                <a 
                    href="${RessetPasswordUrl}"
                    style="
                        display: inline-block;
                        padding: 12px 24px;
                        background-color: #007bff;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                    "
                >
                    Reset Your Password
                </a>

                <p>If you didn't create an account, you can ignore this email.</p>
            </div>
            `
        })

        return {message:"Verification email sent successfully, Please Verfiy Your Email"}
    }
}
