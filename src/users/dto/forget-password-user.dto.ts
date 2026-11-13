import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ForgetPasswordDTO{

    @ApiProperty({ example: 'user@example.com', description: 'User registered email address' })
    @IsNotEmpty()
    @IsEmail()
    email:string
}