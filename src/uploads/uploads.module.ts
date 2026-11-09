import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller.js';
import { UploadsService } from './uploads.service.js';
import { UsersModule } from '../users/users.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService],
  imports:[UsersModule,TypeOrmModule.forFeature([User]),JwtModule]
})
export class UploadsModule {}
