import { BadRequestException , NotFoundException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import { diskStorage } from 'multer';
import { Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller('api/uploads')
export class UploadsController {

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
}
