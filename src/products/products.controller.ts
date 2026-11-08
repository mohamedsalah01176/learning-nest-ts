import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { Roles } from '../decorators/roles/roles.decorator.js';
import { RoleSystem } from '../decorators/roles/roles.enums.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { RolesGuard } from '../guards/roles.guard.js';
import { getUserPayload } from '../decorators/users/getUserPayload.js';
import type { JWTPayload } from '../users/interfaces.js';

@Controller('api/products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  // @Roles([RoleSystem.Admin])
  // @UseGuards(RolesGuard)
  async create(@Body() createProductDto: CreateProductDto, @getUserPayload() payload:JWTPayload) {
    return this.productsService.create(createProductDto,payload.id as number);
  }

  @Get()
  findAll(
    @Query("name") name?:string,
    @Query("minPrice",new DefaultValuePipe(0),ParseIntPipe) minPrice?:number,
    @Query("maxPrice", new DefaultValuePipe(999999),ParseIntPipe) maxPrice?:number,
    @Query("pageNumber",new DefaultValuePipe(1),ParseIntPipe) pageNumber?:number,
    @Query("perPage",new DefaultValuePipe(20),ParseIntPipe) perPage?:number,
  ) {
    return this.productsService.findAll(name,minPrice,maxPrice,pageNumber,perPage);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,@getUserPayload() payload: JWTPayload) {

    return this.productsService.update(+id, updateProductDto,payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string ,@getUserPayload() payload: JWTPayload) {
    return this.productsService.remove(+id, payload);
  }
}
