import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';



export interface IUser{
    id?:number,
    name?:string,
    email?:string
}
@Controller('users')
export class UsersController {
    private users:IUser[] = [{id:1, name:"mohamed",email:"mohamed@com"}, {id:2, name:"salah",email:"salah@com"}];
    @Get()
    findAll(){
        return this.users
    }

    @Get(":id")
    findOne(@Param ("id") id:string){
        const product=this.users.find((item)=>item.id===+id)
        
        if(product){
            return product;
        }else{
            return "Product not found"
        }

    }

    @Post()
    createUser(@Body() body:IUser){
        if(!body){
            return "name and email required";
        }

        this.users.push({id:this.users.length +1,...body})

        return "User Created"
    }

    @Put(":id")
    updateUser(@Param("id") id:string, @Body() body:IUser){
        const userindex=this.users.findIndex(user=> user.id === +id);

        if(!userindex){
            return "User Not Found";
        }
        
        this.users[userindex]={...this.users[userindex],...body};
        return "User Updated";
    }

    @Delete(":id")
    deleteUser(@Param("id") id:string){
        const userindex=this.users.findIndex(user=> user.id === +id);


        if(userindex > -1){
            this.users[userindex]={name:"",email:""};
            return "User Deleted"
        }

        return "User Not Found";
    }
}
