import { Body,NotFoundException,UploadedFile, BadRequestException,UseInterceptors, Controller, Delete, Get, Param, Post, Put , ParseIntPipe , UseGuards, UsePipes, ValidationPipe, HttpCode , HttpStatus} from '@nestjs/common';
import type  {  JWTPayload } from './interfaces.js';
import { UsersService } from './users.service.js';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { UpdateUserDTO } from './dto/update-user.dto.js';
import { LoginUserDTO } from './dto/login.dto.js';
import { getUserPayload } from '../decorators/users/getUserPayload.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { Roles } from '../decorators/roles/roles.decorator.js';
import { RoleSystem } from '../decorators/roles/roles.enums.js';
import { RolesGuard } from '../guards/roles.guard.js';
import { AuthService } from './auth.service.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ForgetPasswordDTO } from './dto/forget-password-user.dto.js';
import { ResetPasswordDTO } from './dto/restpasswor-users.dto.js';
import { ApiBody, ApiConsumes, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ImageUplaodDto } from './dto/image-uploads.dto.js';

@ApiTags('Users & Auth')
@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService:UsersService , private readonly authService:AuthService ){}

    @Post("auth/register")
    @ApiOperation({
        summary: 'Register a new user',
        description: 'Creates a new user account and sends an email verification link.',
    })
    async register( @Body() body:CreateUserDTO){
         return this.authService.Register(body);     
    }
    
    @Post("auth/login")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Login user',
        description: 'Authenticates user credentials and returns a JWT token.',
    })
    async login( @Body() body:LoginUserDTO){
         return this.authService.login(body);     
    }

    @Get("me")
    @UseGuards(AuthGuard)
    @ApiSecurity("bearer")
    @ApiOperation({
        summary: 'Get current user profile',
        description: 'Returns profile details for the currently logged in user.',
    })
    async getUser(@getUserPayload() userPaylod:JWTPayload){
     return await this.usersService.getInformationOfUser(userPaylod.id as number);
    }

    @Get("all-user")
    @Roles([RoleSystem.Admin])
    @UseGuards(AuthGuard,RolesGuard)
    @ApiSecurity("bearer")
    @ApiOperation({
        summary: 'Get all users (Admin only)',
        description: 'Retrieves a list of all registered users.',
    })
    async getAllUsers(){
     return await this.usersService.getAllUsers();
    }

    @Put("")
    @UseGuards(AuthGuard)
    @ApiSecurity("bearer")
    @ApiOperation({
        summary: 'Update current user',
        description: 'Updates information for the currently logged in user.',
    })
    async updateUserControle(@getUserPayload() payload:JWTPayload,@Body() body:UpdateUserDTO){
          return await this.usersService.updateUser(payload.id as number,body)
    }

    


    @Post("upload-image")
    @UseGuards(AuthGuard)
    @ApiSecurity("bearer")
    @ApiOperation({
        summary: 'Upload profile image',
        description: 'Uploads and attaches a profile avatar image for the authenticated user.',
    })
    @UseInterceptors(FileInterceptor("user-image",{
        storage:diskStorage({
            destination:"./images/users",
            filename:(req,file,cd)=>{
                const prefix=`${Date.now()}-${Math.random() *1000}`
                const fileName= `${prefix}-${file.originalname}`
                cd(null,fileName)
            }
        }),
        fileFilter:(req,file,cd)=>{
            if(file.mimetype.includes("image/")){
                cd(null,true)
            }else{
                cd( new BadRequestException("UnSupported file format"),false)
            }
        },
        limits:{fieldSize:1024 * 1024}
    }))
    @ApiConsumes("multipart/form-data")
    @ApiBody({type:ImageUplaodDto ,description:"profile Image"})
    async uploadProfileImage(@UploadedFile() file:Express.Multer.File, @getUserPayload() payload:JWTPayload){
        if(!file) throw new NotFoundException("file not found");
        return this.usersService.setProfileImage(payload.id as number,file.filename)
    }
    
    @Delete("remove-profile-image")
    @UseGuards(AuthGuard)
    @ApiSecurity("bearer")
    @ApiOperation({
        summary: 'Remove profile image',
        description: 'Deletes the profile image of the authenticated user.',
    })
    async deleteProfileImageControl(@getUserPayload() payload:JWTPayload){
        return await this.usersService.deleteImage(payload.id as number)
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    @ApiSecurity("bearer")
    @ApiOperation({
        summary: 'Delete user',
        description: 'Deletes a user account by ID.',
    })
    async deleteUser(@Param("id",ParseIntPipe) id:number ,@getUserPayload() body:JWTPayload){
     return await this.usersService.deleteUser(id,body)
    }


    @Get("verfiy-email/:userId/:verificationToken")
    @ApiOperation({
        summary: 'Verify user email',
        description: 'Verifies user email using the token sent upon registration.',
    })
    async verificationEmail(
        @Param("userId",ParseIntPipe) userId:number,
        @Param("verificationToken") verificationToken:string,
    ){
        return await this.authService.checkVerificationToken(userId,verificationToken)
    }

    @Post("forget-password")
    @ApiOperation({
        summary: 'Forget password request',
        description: 'Sends a password reset link to the given email address.',
    })
    async forgetPassword(
        @Body() body:ForgetPasswordDTO
    ){
        return await this.authService.handleforgetPassword(body)
    }

    @Post("reset-password/:userId/:resetPasswordToken")
    @ApiOperation({
        summary: 'Reset password',
        description: 'Resets the user password using verification token.',
    })
    async resetPassword(
        @Body() body:ResetPasswordDTO,
        @Param("userId",ParseIntPipe) userId:number,
        @Param("resetPasswordToken") resetPasswordToken:string,
    ){
        return await this.authService.handleResetPassword(userId,resetPasswordToken,body)
    }


    // @Get()
    // findAll(){
    //     return this.UsersService.handleGetAllUsers();
    // }

    // @Get(":id")
    // findOne(@Param ("id", ParseIntPipe) id:string){
    //     return this.UsersService.handleGetSingleUser(+id);

    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createUser(@Body(UppercasePipe) body:CreateUserDTO){
    //     return this.UsersService.handleAddNewUser(body);
    // }

    // @Put(":id")
    // @UsePipes(ValidationPipe)
    // updateUser(@Param("id" , ParseIntPipe) id:string, @Body() updateUserDTO:UpdateUserDTO){
    //     return this.UsersService.handleUpdateUser(+id,updateUserDTO)
    // }

    // @Delete(":id")
    // deleteUser(@Param("id" , ParseIntPipe) id:number){
    //     return this.UsersService.handleRemoveUser(id)
    // }
}
