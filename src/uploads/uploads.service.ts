import { Injectable , BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity.js';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service.js';
import { unlinkSync } from 'fs';
import { join } from 'path';


@Injectable()
export class UploadsService {

    constructor( 
        @InjectRepository(User) private readonly userRespository:Repository<User>,
        private readonly userServicers:UsersService,

    ){}


    async setProfileImage(userId:number,newProfileImage:string){
        const user = await this.userServicers.getInformationOfUser(userId);

        if (user.imageProfile) {
            await this.deleteImage(userId);
        }

        user.imageProfile = newProfileImage;


        this.userRespository.save(user);
    }

    async deleteImage(userId:number){
        const user=await this.userServicers.getInformationOfUser(userId);

        if(user.imageProfile === null) throw new BadRequestException();

        const imagePath = join(
            process.cwd(),
            'images',
            'users',
            user.imageProfile as string
        );

        await unlinkSync(imagePath);

        user.imageProfile=null;
        return await this.userRespository.save(user);

    }
}
