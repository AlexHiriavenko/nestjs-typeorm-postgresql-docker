import AppDataSource from '@/data-source';
import { CategorySeeder } from './seeders/category.seeder';
import { ProductSeeder } from './seeders/product.seeder';

async function seedDatabase() {
  const dataSource = await AppDataSource.initialize();

  console.log('🌱 Starting database seeding...');
  await CategorySeeder.run(dataSource);
  await ProductSeeder.run(dataSource);

  await dataSource.destroy();
  console.log('🌱 Seeding completed!');
}

seedDatabase().catch((error) => {
  console.error('❌ Error during seeding:', error);
});
