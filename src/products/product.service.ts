import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { FilteredProductsType } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProducts(
    perPage: number,
    page: number,
    search?: string,
  ): Promise<FilteredProductsType> {
    return this.productRepository.findAllWithPagination(perPage, page, search);
  }

  async getBySearch(perPage: number, page: number, search: string) {
    return this.productRepository.getBySearch(perPage, page, search);
  }

  async findById(id: number) {
    return this.productRepository.findOne(id);
  }
}
