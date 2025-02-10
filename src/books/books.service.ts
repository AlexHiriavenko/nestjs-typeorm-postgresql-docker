import { Injectable } from '@nestjs/common';
import { BooksRepository } from './repositories/books.repository';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  findAll(): Promise<Book[]> {
    return this.booksRepository.findAll();
  }

  findOne(id: number): Promise<Book | null> {
    return this.booksRepository.findOne(id);
  }

  create(bookData: Partial<Book>): Promise<Book> {
    return this.booksRepository.create(bookData);
  }

  update(id: number, updateData: Partial<Book>): Promise<Book | null> {
    return this.booksRepository.update(id, updateData);
  }

  remove(id: number): Promise<void> {
    return this.booksRepository.remove(id);
  }
}
