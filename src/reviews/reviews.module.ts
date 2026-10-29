import { forwardRef, Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service.js';
import { ReviewsController } from './reviews.controller.js';
import { ProductsModule } from '../products/products.module.js';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports:[ReviewsService],
  imports:[forwardRef(()=>ProductsModule)]
})
export class ReviewsModule {}
