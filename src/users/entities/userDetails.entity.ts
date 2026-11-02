import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import type { User } from "./users.entity.js";

@Entity({ name: "user_details" })
export class UserDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:"float",
        nullable:true
    })
    salary: number;

    @Column({
        type: "varchar",
        nullable: true
    })
    location: string;

    @OneToOne("User", "details")
    user: User;

}