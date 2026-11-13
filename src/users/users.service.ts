import { Injectable, BadRequestException , NotFoundException, ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDTO } from './dto/update-user.dto.js';
import { JwtPayload } from 'jsonwebtoken';
import { RoleSystem } from '../decorators/roles/roles.enums.js';
import { AuthService } from './auth.service.js';
import { unlinkSync } from 'fs';
import { join } from 'path';
import { ApiSecurity } from '@nestjs/swagger';

@Injectable()
@ApiSecurity("bearer")
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly userRespository:Repository<User>,
        private readonly authService:AuthService
    ){}
    


    async getInformationOfUser(id:number){
        const user = await this.userRespository.findOne({where:{id}});
        if(!user) throw new NotFoundException("User Not Found");

        return user;
    }

    async getAllUsers(){
        return await this.userRespository.find();
    }

    async updateUser(id:number,body:UpdateUserDTO){

        try{

            const {name , password} = body;
            const user =  await this.getInformationOfUser(id);

            if(!user) throw new NotFoundException("User Not Found");

            if (name) user.name = name;

            if(password) {
                user.password = await this.authService.generateHashPassword(password)
            }

            return this.userRespository.save(user)

        }catch(error){
            return error
        }
    }

    async deleteUser(id:number,payload:JwtPayload){
        const user = await this.getInformationOfUser(id);
 

        if(user?.id === payload.id || payload.role === RoleSystem.Admin) {
            await this.userRespository.remove(user);
            return {message:"Users Deleted"}
        }
        throw new ForbiddenException("access denied, you are not allowed");

    }

    async setProfileImage(userId:number,newProfileImage:string){
        const user = await this.getInformationOfUser(userId);

        if (user.imageProfile) {
            await this.deleteImage(userId);
        }

        user.imageProfile = newProfileImage;


        await this.userRespository.save(user);

        return {message:"Profile Image Updated"}
    }

    async deleteImage(userId:number){
        const user=await this.getInformationOfUser(userId);

        if(user.imageProfile === null) throw new BadRequestException();

        const imagePath = join(
            process.cwd(),
            'images',
            'users',
            user.imageProfile as string
        );

        await unlinkSync(imagePath);

        user.imageProfile=null;
        return await this.userRespository.save(user);

    }

    




    // // private users:IUser[] = [{id:1, name:"mohamed",email:"mohamed@com"}, {id:2, name:"salah",email:"salah@com"}];

    // async handleGetAllUsers(){

    //     const usesrs=await this.userRespository.find(); 
    //     // const token=jwt.sign({user:this.users[0],role:'admin'},process.env.JWT_SECRET as string,{expiresIn:"1h"})
    //      return usesrs;
    // }

    // async handleGetSingleUser(id:number){
    //     // const product=this.users.find((item)=>item.id===+id)

    //     const userFound= await this.userRespository.findOne({where:{id}})
        
    //     if(!userFound) throw new NotFoundException("user not found");

    //     return userFound
    // }

    // async handleAddNewUser(body:CreateUserDTO){
    //     if(!body) throw new NotFoundException("name and email required");

    //     const user = await this.userRespository.create(body);

    //     return await this.userRespository.save(user);
    // }

    // async handleUpdateUser(id:number, body:UpdateUserDTO){
    //     const user =  await this.handleGetSingleUser(id);
    //     return await this.userRespository.save({...user,...body})
    // }
    // async handleRemoveUser(id:number){
    //     const user =  await this.handleGetSingleUser(id);
    //     await this.userRespository.remove(user);                                                                                                                                                
    //     return "User Deleted Successfully"

    // }
}
