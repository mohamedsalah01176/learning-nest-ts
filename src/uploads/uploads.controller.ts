import { UploadedFiles, NotFoundException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import { Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ApiOperation, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('Uploads')
@Controller('api/uploads')
export class UploadsController {
    @Post()
    @ApiOperation({
        summary: 'Upload single file',
        description: 'Uploads a single file to the server.',
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() file:Express.Multer.File){
        if(!file) throw new NotFoundException("file not found");
        return {message:"File Uploaded Successfully"}
    }
    
    @Post("muilte")
    @ApiOperation({
        summary: 'Upload multiple files',
        description: 'Uploads multiple files to the server at once.',
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    })
    @UseInterceptors(FilesInterceptor('files'))
    uploadMultiImage(@UploadedFiles() files:Array<Express.Multer.File>){
        if(!files || files.length === 0) throw new NotFoundException("file not found");
        return {message:"Files Uploaded Successfully"}
    }

    @Get(":image")
    @ApiOperation({
        summary: 'Get uploaded image by name',
        description: 'Retrieves and serves an uploaded image file.',
    })
    showImage(@Param("image") image:string,@Res() res:Response){
        return res.sendFile(image,{root:"images"})
    }

    
}
