import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getAllProducts(perPage?: number, page?: number, search?: string): Promise<import("./product.repository").FilteredProductsType>;
    getProductsBySearch(perPage: number | undefined, page: number | undefined, search: string): Promise<import("./product.repository").FilteredProductsType>;
}
