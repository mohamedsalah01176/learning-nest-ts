import {  Type } from "class-transformer";
import { IsNotEmpty, Min ,Max , Length ,IsEmail ,IsNotEmptyObject , ValidateNested , IsInt, IsString, MinLength, MaxLength, IsOptional} from "class-validator";

export class DetailsUserDTO{
    @IsNotEmpty()
    @IsInt()
    @Min(5)
    @Max(100000)
    salary:number;
    
    @IsNotEmpty()
    location:string;
}

export class CreateUserDTO{
    @IsNotEmpty()
    @Length(3,50)
    name:string;

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(100)
    password: string;


    @ValidateNested()
    @IsOptional()
    @Type(()=> DetailsUserDTO)
    details:DetailsUserDTO
}