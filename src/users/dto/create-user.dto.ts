import { Type } from "class-transformer";
import { IsNotEmpty, Min ,Max , Length ,IsEmail ,IsNotEmptyObject , ValidateNested , IsInt} from "class-validator";

class DetailsUserDTO{
    @IsNotEmpty()
    @IsInt()
    @Min(5)
    @Max(100)
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


    @ValidateNested()
    @IsNotEmptyObject()
    @Type(()=> DetailsUserDTO)
    details:DetailsUserDTO
}