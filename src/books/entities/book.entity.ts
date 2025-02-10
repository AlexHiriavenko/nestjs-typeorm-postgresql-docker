import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('books') // Имя таблицы в базе
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255 })
  author: string;

  @Column({ type: 'int', nullable: true })
  published_year?: number;

  @Column({ length: 100, nullable: true })
  genre?: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  price?: number;
}
