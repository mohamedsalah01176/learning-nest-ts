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
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @Column({default:true})
  @IsBoolean()
  isActive:boolean
}