import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
export type FilteredProductsType = {
    products: Product[];
    totalPages: number;
    page: number;
    perPage: number;
};
export declare class ProductRepository {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    findAllWithPagination(perPage: number, page: number, search?: string): Promise<FilteredProductsType>;
    getBySearch(perPage: number, page: number, search?: string): Promise<FilteredProductsType>;
    findOne(id: number): Promise<Product | null>;
}
