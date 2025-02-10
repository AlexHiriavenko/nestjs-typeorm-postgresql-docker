import { BooksRepository } from './repositories/books.repository';
import { Book } from './entities/book.entity';
export declare class BooksService {
    private readonly booksRepository;
    constructor(booksRepository: BooksRepository);
    findAll(): Promise<Book[]>;
    findOne(id: number): Promise<Book | null>;
    create(bookData: Partial<Book>): Promise<Book>;
    update(id: number, updateData: Partial<Book>): Promise<Book | null>;
    remove(id: number): Promise<void>;
}
