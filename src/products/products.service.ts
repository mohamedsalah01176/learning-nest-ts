import { ForbiddenException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { UsersService } from '../users/users.service.js';
import { Between, Like, Repository } from 'typeorm';
import { Product } from './entities/product.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { JWTPayload } from '../users/interfaces.js';
import { RoleSystem } from '../decorators/roles/roles.enums.js';

@Injectable()
export class ProductsService {

constructor(
  private readonly usersService:UsersService,
  @InjectRepository(Product) private readonly productRepository:Repository<Product>
) {}

  async create(body: CreateProductDto,userId:number) {
    
    const user = await this.usersService.getInformationOfUser(userId);

    const product= await this.productRepository.create({
      ...body,
      user
    })
    return await this.productRepository.save(product)
  }

  async findAll(name?:string,minPrice?:number,maxPrice?:number,pageNumber?:number,perPage?:number) {

    const filters={
      ...(name?{name:Like(`%${name}%`)}:{}),
      ...(minPrice && maxPrice?{price:Between(minPrice,maxPrice)}:{})
    }
    return await this.productRepository.find({
      where:{...filters},
      skip:(perPage as number) * ((pageNumber as number) - 1),
      take:perPage
    })
  }

  async findOne(id: number) {
    const product= await this.productRepository.findOne({where:{id},relations:{user:true}})
    if(!product) throw new NotFoundException("Product Not Found");
    return product;
  }

  async update(id: number, body: UpdateProductDto,payload:JWTPayload) {
      console.log('DTO:', body);

    const product = await this.checkProductAccess(id,payload)

    this.productRepository.merge(product, body);

    return await this.productRepository.save(product);
  }

  async remove(id: number,payload:JWTPayload) {
    const product = await this.checkProductAccess(id,payload);

    return this.productRepository.remove(product);
  }


  private async checkProductAccess(id: number, payload: JWTPayload){
    const product = await this.findOne(id);

    const isAdmin = payload.role === RoleSystem.Admin;
    const isOwner = payload.id === product.user.id;

    if (!isAdmin && !isOwner)  
      throw new ForbiddenException(
        'You are not allowed to modify this product',
      );

    return product
  }

  
}
