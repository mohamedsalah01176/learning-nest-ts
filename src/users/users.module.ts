import { Module } from '@nestjs/common';
import { EmployeeModule } from '../employee/employee.module.js';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';

@Module({
    imports:[EmployeeModule],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
