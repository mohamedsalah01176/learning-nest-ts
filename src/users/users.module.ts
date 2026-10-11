import { Module } from '@nestjs/common';
import { EmployeeModule } from '../employee/employee.module.js';
import { UsersController } from './users.controller.js';

@Module({
    imports:[EmployeeModule],
    controllers: [UsersController]
})
export class UsersModule {}
