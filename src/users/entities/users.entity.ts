import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import type { UserDetails } from "./userDetails.entity.js";
import { RoleSystem } from "../../decorators/roles/roles.enums.js";
import type { Product } from "../../products/entities/product.entity.js";
import type { Review } from "../../reviews/entities/review.entity.js";
import { Exclude } from "class-transformer";



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

    @Column({ type: "varchar",nullable:true,default:null})
    imageProfile?:string | null

    @Column({
        type:"varchar",
        length:100,
        nullable:false
    })
    @Exclude()
    password:string;

    @OneToOne("UserDetails", "user", {
        cascade: true,
    })
    @JoinColumn()
    details: UserDetails;

    @Column({type:"enum",enum:RoleSystem,default:RoleSystem.User})
    role:RoleSystem

    @Column({type:"boolean", default:false})
    isActive:boolean

    @CreateDateColumn({default:()=> "CURRENT_TIMESTAMP(6)", type:"timestamp"})
    create_at:string;
    @UpdateDateColumn({default:()=> "CURRENT_TIMESTAMP(6)", type:"timestamp",onUpdate:"CURRENT_TIMESTAMP(6)"})
    update_at:string

    @OneToMany("Product","User")
    product:Product[]

    @OneToMany("Review","User")
    reviews:Review[]
}

