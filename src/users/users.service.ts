import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './interfaces.js';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { UpdateUserDTO } from './dto/update-user.dto.js';
import jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private readonly userRespository:Repository<User>){}


    // private users:IUser[] = [{id:1, name:"mohamed",email:"mohamed@com"}, {id:2, name:"salah",email:"salah@com"}];

    async handleGetAllUsers(){

        const usesrs=await this.userRespository.find(); 
        // const token=jwt.sign({user:this.users[0],role:'admin'},process.env.JWT_SECRET as string,{expiresIn:"1h"})
         return usesrs;
    }

    async handleGetSingleUser(id:number){
        // const product=this.users.find((item)=>item.id===+id)

        const userFound= await this.userRespository.findOne({where:{id}})
        
        if(!userFound) throw new NotFoundException("user not found");

        return userFound
    }

    async handleAddNewUser(body:CreateUserDTO){
        if(!body) throw new NotFoundException("name and email required");

        const user = await this.userRespository.create(body);

        return await this.userRespository.save(user);
    }

    async handleUpdateUser(id:number, body:UpdateUserDTO){
        const user =  await this.handleGetSingleUser(id);
        return await this.userRespository.save({...user,...body})
    }
    async handleRemoveUser(id:number){
        const user =  await this.handleGetSingleUser(id);
        await this.userRespository.remove(user);                                                                                                                                                
        return "User Deleted Successfully"

    }
}
