import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService:MailerService){}

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
}
