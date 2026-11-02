import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { ProductsController } from './products.controller.js';
import { PersonsModule } from '../persons/persons.module.js';
import { ReviewsModule } from '../reviews/reviews.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity.js';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[ProductsService],
  imports:[PersonsModule , forwardRef(()=>ReviewsModule) ,TypeOrmModule.forFeature([Product])]
})
export class ProductsModule {}
