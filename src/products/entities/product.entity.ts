import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '@/categories/entities/category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'int', unique: true })
  article: number;

  @Column({ length: 100, nullable: true })
  color?: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  price?: number;

  @Column({ length: 255, nullable: true })
  img?: string;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' }) // Связываем categoryId с Category
  category: Category;
}
