import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>, // TypeORM Repository теперь инкапсулирован
  ) {}

  async findAll(): Promise<Book[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Book | null> {
    return this.repository.findOneBy({ id });
  }

  async create(bookData: Partial<Book>): Promise<Book> {
    const book = this.repository.create(bookData);
    return this.repository.save(book);
  }

  async update(id: number, updateData: Partial<Book>): Promise<Book | null> {
    await this.repository.update(id, updateData);
    return this.repository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
