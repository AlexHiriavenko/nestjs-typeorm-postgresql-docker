import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(
    @Query('perPage') perPage: number = 10,
    @Query('page') page: number = 1,
    @Query('search') search?: string,
  ) {
    return this.productService.getProducts(perPage, page, search);
  }

  @Get('filter')
  async getProductsBySearch(
    @Query('perPage') perPage: number = 5,
    @Query('page') page: number = 1,
    @Query('search') search: string,
  ) {
    return this.productService.getBySearch(perPage, page, search);
  }
}
