import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { EmployeeModule } from '../employee/employee.module.js';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { UsersMiddleware } from './users.middleware.js';

@Module({
    imports:[EmployeeModule],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule implements NestModule{

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UsersMiddleware).exclude({path:"users",method:RequestMethod.POST}).forRoutes("users");
        // consumer.apply(UsersMiddleware).forRoutes("*");
    }
}
