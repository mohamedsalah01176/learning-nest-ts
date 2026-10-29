import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { ProductsController } from './products.controller.js';
import { PersonsModule } from '../persons/persons.module.js';
import { ReviewsModule } from '../reviews/reviews.module.js';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[ProductsService],
  imports:[PersonsModule , forwardRef(()=>ReviewsModule) ]
})
export class ProductsModule {}
