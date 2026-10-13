import { Body, Controller, Delete, Get, Param, Post, Put , ParseIntPipe, UsePipes, ValidationPipe} from '@nestjs/common';
import type  { IUser } from './interfaces.js';
import { UsersService } from './users.service.js';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { UpdateUserDTO } from './dto/update-user.dto.js';




@Controller('users')
export class UsersController {
    constructor(private UsersService:UsersService){}


    @Get()
    findAll(){
        return this.UsersService.handleGetAllUsers();
    }

    @Get(":id")
    findOne(@Param ("id", ParseIntPipe) id:string){
        return this.UsersService.handleGetSingleUser(+id);

    }

    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() body:CreateUserDTO){
        return this.UsersService.handleAddNewUser(body);
    }

    @Put(":id")
    @UsePipes(ValidationPipe)
    updateUser(@Param("id" , ParseIntPipe) id:string, @Body() updateUserDTO:UpdateUserDTO){
        return this.UsersService.handleUpdateUser(+id,updateUserDTO)
    }

    @Delete(":id")
    deleteUser(@Param("id" , ParseIntPipe) id:number){
        return this.UsersService.handleRemoveUser(id)
    }
}
