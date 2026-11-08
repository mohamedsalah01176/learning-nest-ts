import {  Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service.js';
import { ReviewsController } from './reviews.controller.js';
import { ProductsModule } from '../products/products.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity.js';
import { UsersModule } from '../users/users.module.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports:[ReviewsService],
  imports:[ProductsModule,UsersModule,TypeOrmModule.forFeature([Review]),JwtModule]
})
export class ReviewsModule {}
