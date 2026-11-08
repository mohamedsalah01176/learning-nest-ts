import { Controller ,UseGuards , ParseIntPipe, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';
import { getUserPayload } from '../decorators/users/getUserPayload.js';
import type { JWTPayload } from '../users/interfaces.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { RolesGuard } from '../guards/roles.guard.js';
import { Roles } from '../decorators/roles/roles.decorator.js';
import { RoleSystem } from '../decorators/roles/roles.enums.js';

@Controller('api/reviews')
@UseGuards(AuthGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(":id")
  create(@Body() createReviewDto: CreateReviewDto,@getUserPayload() payload:JWTPayload,@Param("id",ParseIntPipe) productId:number) {
    return this.reviewsService.create(createReviewDto,payload.id as number,productId);
  }

  @Get()
  @Roles([RoleSystem.Admin])
  @UseGuards(RolesGuard)
  findAll() {
    return this.reviewsService.getAllReviews();
  }


  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @getUserPayload() payload:JWTPayload, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.updateReview(id,payload.id as number, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number, @getUserPayload() payload:JWTPayload) {
    return this.reviewsService.deleteReview(id,payload.id as number);
  }
}
