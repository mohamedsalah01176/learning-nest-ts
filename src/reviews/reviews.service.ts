import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';
import { ProductsService } from '../products/products.service.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity.js';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,  
    @InjectRepository(Review) private readonly reviewRepository:Repository<Review> 
  ) {}

  
  async create(body: CreateReviewDto,userId:number,productId:number) {
    const user = await this.usersService.getInformationOfUser(userId);
    const product = await this.productsService.findOne(productId);

    const review = await this.reviewRepository.create({...body,user,product})
    const savedReview = await this.reviewRepository.save(review);
    
    return {
    id: savedReview.id,
    rating: savedReview.rating,
    comment: savedReview.comment,
    createdAt: savedReview.createdAt,
    updatedAt: savedReview.updatedAt,
  };

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
