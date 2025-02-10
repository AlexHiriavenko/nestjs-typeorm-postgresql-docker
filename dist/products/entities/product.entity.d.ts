import { Category } from '@/categories/entities/category.entity';
export declare class Product {
    id: number;
    name: string;
    article: number;
    color?: string;
    price?: number;
    img: string;
    category: Category;
}
