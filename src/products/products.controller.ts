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
import { ApiOperation, ApiQuery, ApiSecurity, ApiTags  } from '@nestjs/swagger';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@ApiTags('Products')
@Controller('api/products')
@UseGuards(AuthGuard)
@ApiSecurity("bearer")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  // @Roles([RoleSystem.Admin])
  // @UseGuards(RolesGuard)
  @ApiOperation({
    summary: 'Create a new product',
    description: 'Creates a new product for the authenticated user.',
  })
  async create(@Body() createProductDto: CreateProductDto, @getUserPayload() payload:JWTPayload) {
    return this.productsService.create(createProductDto,payload.id as number);
  }

  // @Throttle({default:{ttl:10000,limit:5}})
  // @SkipThrottle()
  @Get()
  @ApiOperation({
    summary: 'Get all products',
    description: 'Returns products with optional filtering by name, price, and pagination.',
  })
  @ApiQuery({
    name: "name",
    required: false,
    type: String,
    example: "laptop",
  })
  @ApiQuery({
    name: "minPrice",
    required: false,
    type: Number,
    example: 100,
  })
  @ApiQuery({
    name: "maxPrice",
    required: false,
    type: Number,
    example: 1000,
  })
  @ApiQuery({
    name: "pageNumber",
    required: false,
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: "perPage",
    required: false,
    type: Number,
    example: 20,
  })
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
  @ApiOperation({
    summary: 'Get product by ID',
    description: 'Returns a single product using its ID.',
  })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update product',
    description: 'Updates an existing product using its ID.',
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,@getUserPayload() payload: JWTPayload) {

    return this.productsService.update(+id, updateProductDto,payload);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete product',
    description: 'Deletes an existing product using its ID.',
  })
  remove(@Param('id') id: string ,@getUserPayload() payload: JWTPayload) {
    return this.productsService.remove(+id, payload);
  }
}
