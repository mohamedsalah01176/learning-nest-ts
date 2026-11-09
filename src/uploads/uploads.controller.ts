import { UploadedFiles, NotFoundException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import { Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller('api/uploads')
export class UploadsController {
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() file:Express.Multer.File){
        if(!file) throw new NotFoundException("file not found");
        return {message:"File Uploaded Successfully"}
    }
    
    @Post("muilte")
    @UseInterceptors(FilesInterceptor('files'))
    uploadMultiImage(@UploadedFiles() files:Array<Express.Multer.File>){
        if(!files || files.length === 0) throw new NotFoundException("file not found");
        return {message:"Files Uploaded Successfully"}
    }

    @Get(":image")
    showImage(@Param("image") image:string,@Res() res:Response){
        return res.sendFile(image,{root:"images"})
    }

    
}
