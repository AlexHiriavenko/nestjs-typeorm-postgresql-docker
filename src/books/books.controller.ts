import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpStatus,
  NotFoundException,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { plainToInstance } from 'class-transformer';
import { Book } from './entities/book.entity';
import { BookResponse } from './dto/book-response/book-response.dto';
import { UpdateBookDto } from './dto/update-book/update-book.dto';
import { CreateBookValidationPipe } from './pipes/create-book-validation.pipe';
import { CreateBook } from './dto/create-book/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAllBooks(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  async getBook(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Partial<Book>> {
    const book = await this.booksService.findOne(id);
    if (!book) {
      throw new NotFoundException(`Книга с ID ${id} не найдена`);
    }
    // return book;
    return plainToInstance(BookResponse, book, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @UsePipes(CreateBookValidationPipe)
  createBook(@Body() bookData: CreateBook): Promise<Book> {
    return this.booksService.create(bookData);
  }

  @Put(':id')
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    )
    updateData: UpdateBookDto,
  ): Promise<Book> {
    const updatedBook = await this.booksService.update(id, updateData);
    if (!updatedBook) {
      throw new NotFoundException(`Книга с ID ${id} не найдена`);
    }
    return updatedBook;
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(+id);
  }
}
