import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
  MaxLength,
  IsPositive,
} from 'class-validator';
import { User } from '../../users/entities/users.entity.js';
import { Review } from '../../reviews/entities/review.entity.js';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  @IsPositive()
  price: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  @Min(0)
  stock: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne("User", "Product")
  user:User
  
  @OneToMany("Review", "Product")
  reviews:Review[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}