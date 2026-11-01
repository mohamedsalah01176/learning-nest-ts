import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user_details" })
export class UserDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:"float",
        nullable:false
    })
    salary: number;

    @Column({
        type: "varchar",
        nullable: false
    })
    location: string;
}