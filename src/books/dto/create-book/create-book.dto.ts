import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateBook {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  published_year?: number;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}
