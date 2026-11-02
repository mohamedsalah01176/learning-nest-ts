import { forwardRef, Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service.js';
import { ReviewsController } from './reviews.controller.js';
import { ProductsModule } from '../products/products.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity.js';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports:[ReviewsService],
  imports:[forwardRef(()=>ProductsModule),TypeOrmModule.forFeature([Review])]
})
export class ReviewsModule {}
