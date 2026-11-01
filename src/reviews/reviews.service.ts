import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';
import { ProductsService } from '../products/products.service.js';

@Injectable()
export class ReviewsService {
  constructor(
    @Inject(forwardRef(() => ProductsService))
    // private readonly productsService: ProductsService,
    private readonly productsService: any, 
  ) {}

  
  create(createReviewDto: CreateReviewDto) {
    return 'This action adds a new review';
  }

  findAll() {
    const products=this.productsService.findAll()
    return `This action returns all reviews` + products;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
