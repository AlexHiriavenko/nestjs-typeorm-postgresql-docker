import 'dotenv/config';
import { DataSource } from 'typeorm';
// import { Category } from './categories/entities/category.entity';
// import { Product } from './products/entities/product.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'test_db',
  // entities: [Category, Product],
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  //   migrations: [__dirname + '/../migrations/*.{ts,js}'], // Путь к миграциям
  migrations: ['src/migrations/*.{ts,js}'],
  synchronize: false,
  logging: true,
});

console.log('✅ DATA SOURCE LOADED!');

export default AppDataSource;
