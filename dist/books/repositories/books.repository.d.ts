import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
export declare class BooksRepository {
    private readonly repository;
    constructor(repository: Repository<Book>);
    findAll(): Promise<Book[]>;
    findOne(id: number): Promise<Book | null>;
    create(bookData: Partial<Book>): Promise<Book>;
    update(id: number, updateData: Partial<Book>): Promise<Book | null>;
    remove(id: number): Promise<void>;
}
