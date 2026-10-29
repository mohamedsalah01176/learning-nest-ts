import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PersonsService } from '../persons/persons.service.js';
import { ReviewsService } from '../reviews/reviews.service.js';

@Injectable()
export class ProductsService {

constructor(
  private readonly personService: PersonsService,
  @Inject(forwardRef(() => ReviewsService))
  private readonly reviewService: ReviewsService,
) {}

  create(createProductDto: CreateProductDto) {
    
    return 'This action adds a new product' ;
  }

  findAll() {
    const persons=this.personService.findAll()
    return `This action returns all products ` + persons;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
