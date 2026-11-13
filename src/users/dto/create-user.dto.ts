import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {  Type } from "class-transformer";
import { IsNotEmpty, Min ,Max , Length ,IsEmail ,IsNotEmptyObject , ValidateNested , IsInt, IsString, MinLength, MaxLength, IsOptional} from "class-validator";

export class DetailsUserDTO{
    @ApiProperty({ example: 5000, description: 'User salary' })
    @IsNotEmpty()
    @IsInt()
    @Min(5)
    @Max(100000)
    salary:number;
    
    @ApiProperty({ example: 'Cairo, Egypt', description: 'User location' })
    @IsNotEmpty()
    location:string;
}

export class CreateUserDTO{
    @ApiProperty({ example: 'Mohamed Salah', description: 'User full name', minLength: 3, maxLength: 50 })
    @IsNotEmpty()
    @Length(3,50)
    name:string;

    @ApiProperty({ example: 'user@example.com', description: 'User email address' })
    @IsNotEmpty()
    @IsEmail()
    email:string

    @ApiProperty({ example: 'StrongP@ss123', description: 'User password', minLength: 8, maxLength: 100 })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(100)
    password: string;

    @ApiPropertyOptional({ type: () => DetailsUserDTO, description: 'User additional details' })
    @ValidateNested()
    @IsOptional()
    @Type(()=> DetailsUserDTO)
    details?:DetailsUserDTO
}