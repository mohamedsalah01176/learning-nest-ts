import { Controller ,UseGuards , ParseIntPipe, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';
import { getUserPayload } from '../decorators/users/getUserPayload.js';
import type { JWTPayload } from '../users/interfaces.js';
import { AuthGuard } from '../guards/auth.guard.js';

@Controller('api/reviews')
@UseGuards(AuthGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(":id")
  create(@Body() createReviewDto: CreateReviewDto,@getUserPayload() payload:JWTPayload,@Param("id",ParseIntPipe) productId:number) {
    return this.reviewsService.create(createReviewDto,payload.id as number,productId);
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
