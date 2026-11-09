import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MailerModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
            return {
                transport: {
                    host: config.get<string>("SMTP_HOST"),
                    post: config.get<number>("SMTP_PORT"),
                    secure: process.env.NODE_ENV === "production",
                    auth: {
                        user: config.get<string>("SMTP_USERNAME"),
                        pass: config.get<string>("SMTP_PASSWORD"),
                    }
                }
            }
        }
    })],
    providers:[MailService],
    exports: [MailService],
})
export class MailModule { }
