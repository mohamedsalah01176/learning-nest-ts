import { ForbiddenException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
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

  async getAllReviews() {
    return await this.reviewRepository.find();
  }

  

  async updateReview(reviewId: number,userId:number , body: UpdateReviewDto) {

    const review= await this.findReviewById(reviewId,userId);



    const updateReview= await this.reviewRepository.create({...review,...body});

    return await this.reviewRepository.save(updateReview);
  }

  async deleteReview(reviewId: number,userId:number) {
    const review = await this.findReviewById(reviewId,userId);
    

    await this.reviewRepository.remove(review);

    return {message:"review deleted"}
  }


  private async findReviewById(id: number, userId:number) {
    const review =await this.reviewRepository.findOne({where:{id},relations:{user:true,product:true}});

    if(!review) throw new NotFoundException("Review not found");

    if(review.user.id !== userId) throw new ForbiddenException("access denied");

    return review;
  }
}
