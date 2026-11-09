import { BadRequestException , NotFoundException, Controller, Post,Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import { diskStorage } from 'multer';
import { Get,UseGuards, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { getUserPayload } from '../decorators/users/getUserPayload.js';
import type { JWTPayload } from '../users/interfaces.js';
import { UploadsService } from './uploads.service.js';
import { AuthGuard } from '../guards/auth.guard.js';

@Controller('api/uploads')
@UseGuards(AuthGuard)
export class UploadsController {

    constructor(
        private readonly uploadService:UploadsService
    ){

    }
    @Post()
    @UseInterceptors(FileInterceptor('file',{
        storage:diskStorage({
            destination:"./images",
            filename:(req,file,cd)=>{
                const prefix=`${Date.now()}-${Math.random() *1000}`
                const fileName= `${prefix}-${file.originalname}`
                cd(null,fileName)
            }
        }),
        fileFilter:(req,file,cd)=>{
            if(file.mimetype.startsWith("image/")){
                cd(null,true)
            } else{
                cd( new BadRequestException("UnSupported file format"),false)
            }
        },
        limits:{
            fileSize:1024*1024*2
        }
    }))
    uploadImage(@UploadedFile() file:Express.Multer.File){
        if(!file) throw new NotFoundException("file not found");
        return {message:"File Uploaded Successfully"}
    }


    @Get(":image")
    showImage(@Param("image") image:string,@Res() res:Response){
        return res.sendFile(image,{root:"images"})
    }

    @Post("upload-image")
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
    async uploadProfileImage(@UploadedFile() file:Express.Multer.File, @getUserPayload() payload:JWTPayload){
        if(!file) throw new NotFoundException("file not found");
        return this.uploadService.setProfileImage(payload.id as number,file.filename)
    }
    
    @Delete("remove-profile-image")
    async deleteProfileImageControl(@getUserPayload() payload:JWTPayload){
        
        return await this.uploadService.deleteImage(payload.id as number)
    }
}
