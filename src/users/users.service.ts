import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces.js';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { UpdateUserDTO } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
    private users:IUser[] = [{id:1, name:"mohamed",email:"mohamed@com"}, {id:2, name:"salah",email:"salah@com"}];

    handleGetAllUsers(){
         return this.users
    }

    handleGetSingleUser(id:number){
        const product=this.users.find((item)=>item.id===+id)
        
        if(product){
            return product;
        }else{
            return "Product not found"
        }
    }

    handleAddNewUser(body:CreateUserDTO){
        if(!body){
            return "name and email required";
        }

        this.users.push({id:this.users.length +1,...body})

        return this.users[this.users.length -1];
    }

    handleUpdateUser(id:number, body:UpdateUserDTO){
        const userindex=this.users.findIndex(user=> user.id === +id);

        if(!userindex){
            return "User Not Found";
        }
        
        this.users[userindex]={...this.users[userindex],...body};
        return this.users[userindex];
    }
    handleRemoveUser(id:number){
        const userindex=this.users.findIndex(user=> user.id === +id);


        if(userindex > -1){
            this.users[userindex]={name:"",email:""};
            return "User Deleted"
        }

        return "User Not Found";
    }
}
