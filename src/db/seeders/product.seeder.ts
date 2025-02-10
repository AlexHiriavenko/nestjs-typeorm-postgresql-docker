import { DataSource } from 'typeorm';
import { Product } from '@/products/entities/product.entity';
import { PRODUCTS } from './productsCollection';

export class ProductSeeder {
  public static async run(dataSource: DataSource): Promise<void> {
    const productRepository = dataSource.getRepository(Product);

    // await productRepository.upsert(products, ['article']);
    await productRepository.clear();
    await productRepository.insert(PRODUCTS);
    console.log('✅ Products seeded successfully');
  }
}
