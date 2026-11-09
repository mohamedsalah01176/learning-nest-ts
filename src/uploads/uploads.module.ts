import { Module , BadRequestException } from '@nestjs/common';
import { UploadsController } from './uploads.controller.js';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@Module({
  controllers: [UploadsController],
  providers: [],
  imports:[MulterModule.register({
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
    })]
})
export class UploadsModule {}
