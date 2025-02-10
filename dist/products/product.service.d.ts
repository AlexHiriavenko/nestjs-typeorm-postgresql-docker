import { ProductRepository } from './product.repository';
import { FilteredProductsType } from './product.repository';
export declare class ProductService {
    private readonly productRepository;
    constructor(productRepository: ProductRepository);
    getProducts(perPage: number, page: number, search?: string): Promise<FilteredProductsType>;
    getBySearch(perPage: number, page: number, search: string): Promise<FilteredProductsType>;
    findById(id: number): Promise<import("./entities/product.entity").Product | null>;
}
