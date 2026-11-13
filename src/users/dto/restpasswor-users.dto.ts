import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class ResetPasswordDTO{

    @ApiProperty({ example: 'NewSecret123!', description: 'New password', minLength: 8, maxLength: 100 })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(100)
    newpassword: string;
}