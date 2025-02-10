import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  author?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  published_year?: number;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be bigger than 0' })
  price?: number;
}
