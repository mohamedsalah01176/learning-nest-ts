import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { ProductsController } from './products.controller.js';
import { PersonsModule } from '../persons/persons.module.js';
import { ReviewsModule } from '../reviews/reviews.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity.js';
import { UsersModule } from '../users/users.module.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[ProductsService],
  imports:[PersonsModule , forwardRef(()=>ReviewsModule) ,TypeOrmModule.forFeature([Product]),UsersModule,JwtModule]
})
export class ProductsModule {}
