import { Body, Controller, Delete, Get, Param, Post, Put , ParseIntPipe , UseGuards, UsePipes, ValidationPipe, HttpCode , HttpStatus} from '@nestjs/common';
import type  { IUser, JWTPayload } from './interfaces.js';
import { UsersService } from './users.service.js';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { UpdateUserDTO } from './dto/update-user.dto.js';
import { UppercasePipe } from '../pipes/uppercase/uppercase.pipe.js';
import { LoginUserDTO } from './dto/login.dto.js';
import { getUserPayload } from '../decorators/users/getUserPayload.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { Roles } from '../decorators/roles/roles.decorator.js';
import { RoleSystem } from '../decorators/roles/roles.enums.js';
import { RolesGuard } from '../guards/roles.guard.js';
import { AuthService } from './auth.service.js';





@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService:UsersService , private readonly authService:AuthService ){}

    @Post("auth/register")
    async register( @Body() body:CreateUserDTO){
         return this.authService.Register(body);     
    }
    
    @Post("auth/login")
    @HttpCode(HttpStatus.OK)
    async login( @Body() body:LoginUserDTO){
         return this.authService.login(body);     
    }

    @Get("me")
    @UseGuards(AuthGuard)
    async getUser(@getUserPayload() userPaylod:JWTPayload){
     return await this.usersService.getInformationOfUser(userPaylod.id as number);
    }

    @Get("all-user")
    @Roles([RoleSystem.Admin])
    @UseGuards(AuthGuard,RolesGuard)
    async getAllUsers(){
     return await this.usersService.getAllUsers();
    }

    @Put("")
    @UseGuards(AuthGuard)
    async updateUserControle(@getUserPayload() payload:JWTPayload,@Body() body:UpdateUserDTO){
          return await this.usersService.updateUser(payload.id as number,body)
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    async deleteUser(@Param("id",ParseIntPipe) id:number ,@getUserPayload() body:JWTPayload){
     return await this.usersService.deleteUser(id,body)
    }

    // @Get()
    // findAll(){
    //     return this.UsersService.handleGetAllUsers();
    // }

    // @Get(":id")
    // findOne(@Param ("id", ParseIntPipe) id:string){
    //     return this.UsersService.handleGetSingleUser(+id);

    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createUser(@Body(UppercasePipe) body:CreateUserDTO){
    //     return this.UsersService.handleAddNewUser(body);
    // }

    // @Put(":id")
    // @UsePipes(ValidationPipe)
    // updateUser(@Param("id" , ParseIntPipe) id:string, @Body() updateUserDTO:UpdateUserDTO){
    //     return this.UsersService.handleUpdateUser(+id,updateUserDTO)
    // }

    // @Delete(":id")
    // deleteUser(@Param("id" , ParseIntPipe) id:number){
    //     return this.UsersService.handleRemoveUser(id)
    // }
}
