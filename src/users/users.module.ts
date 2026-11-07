import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { EmployeeModule } from '../employee/employee.module.js';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { UsersMiddleware } from './users.middleware.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service.js';

@Module({
    imports:[
        EmployeeModule,TypeOrmModule.forFeature([User]), 
        JwtModule.registerAsync({
            inject:[ConfigService],
            useFactory:(config:ConfigService)=>{
                return {
                    global:true,
                    secret:config.get("JWT_SECRET"),
                    signOptions:{expiresIn: config.get("JWT_EXPIRESIN")}
                }
            }
        })
    ],
    exports : [UsersService],
    controllers: [UsersController],
    providers: [UsersService , AuthService]
})
export class UsersModule implements NestModule{

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UsersMiddleware).exclude({path:"users",method:RequestMethod.POST}).forRoutes("users");
        // consumer.apply(UsersMiddleware).forRoutes("*");
        // consumer.apply(UsersMiddleware).exclude("users/(*.)"); any routes after users
    }
}
