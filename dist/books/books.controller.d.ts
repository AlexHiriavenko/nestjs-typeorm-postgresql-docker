import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { UpdateBookDto } from './dto/update-book/update-book.dto';
import { CreateBook } from './dto/create-book/create-book.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    getAllBooks(): Promise<Book[]>;
    getBook(id: number): Promise<Partial<Book>>;
    createBook(bookData: CreateBook): Promise<Book>;
    updateBook(id: number, updateData: UpdateBookDto): Promise<Book>;
    deleteBook(id: string): Promise<void>;
}
