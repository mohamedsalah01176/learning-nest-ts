import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  Min,
  MaxLength,
  IsBoolean,
} from 'class-validator';
import { Column } from 'typeorm';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty({ example: 'Wireless Headphones', description: 'Product name', maxLength: 150 })
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'High quality noise cancelling headphones', description: 'Product description' })
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @ApiProperty({ example: 99.99, description: 'Product price' })
  price: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiPropertyOptional({ example: 50, description: 'Stock quantity' })
  stock?: number;

  @Column({default:true})
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ example: true, default: true, description: 'Whether the product is active' })
  isActive?: boolean
}