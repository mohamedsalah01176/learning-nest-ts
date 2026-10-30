import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserDetails } from "./userDetails.entity.js";


@Entity({name:"users"})
export class User{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:"50",type:"varchar" ,nullable:false})
    name:string
    
    @Column({
        type:"varchar",
        nullable:false,
        unique:true
    })
    email:string;

    @Column({
        type:"varchar",
        length:100,
        nullable:false
    })
    password:string;

    @Column({
        type:"json"
    })
    details: UserDetails;

    @CreateDateColumn({default:()=> "CURRENT_TIMESTAMP(6)", type:"timestamp"})
    create_at:string;
    @UpdateDateColumn({default:()=> "CURRENT_TIMESTAMP(6)", type:"timestamp",onUpdate:"CURRENT_TIMESTAMP(6)"})
    update_at:string
}

