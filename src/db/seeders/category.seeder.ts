import { DataSource } from 'typeorm';
import { Category } from '@/categories/entities/category.entity';

export class CategorySeeder {
  public static async run(dataSource: DataSource): Promise<void> {
    const categoryRepository = dataSource.getRepository(Category);

    const categories = [
      { name: 'Books' },
      { name: 'Notebooks' },
      { name: 'Covers' },
      { name: 'Purses' },
    ];

    await categoryRepository.upsert(categories, ['name']);
    console.log('✅ Categories seeded successfully');
  }
}
