import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDTO{


    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({example:"m48162698@gmail.com"})
    email:string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(100)
    @ApiProperty({example:"123456789"})
    password: string;
}