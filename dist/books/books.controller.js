"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const common_1 = require("@nestjs/common");
const books_service_1 = require("./books.service");
const class_transformer_1 = require("class-transformer");
const book_response_dto_1 = require("./dto/book-response/book-response.dto");
const update_book_dto_1 = require("./dto/update-book/update-book.dto");
const create_book_validation_pipe_1 = require("./pipes/create-book-validation.pipe");
const create_book_dto_1 = require("./dto/create-book/create-book.dto");
let BooksController = class BooksController {
    constructor(booksService) {
        this.booksService = booksService;
    }
    getAllBooks() {
        return this.booksService.findAll();
    }
    async getBook(id) {
        const book = await this.booksService.findOne(id);
        if (!book) {
            throw new common_1.NotFoundException(`Книга с ID ${id} не найдена`);
        }
        return (0, class_transformer_1.plainToInstance)(book_response_dto_1.BookResponse, book, {
            excludeExtraneousValues: true,
        });
    }
    createBook(bookData) {
        return this.booksService.create(bookData);
    }
    async updateBook(id, updateData) {
        const updatedBook = await this.booksService.update(id, updateData);
        if (!updatedBook) {
            throw new common_1.NotFoundException(`Книга с ID ${id} не найдена`);
        }
        return updatedBook;
    }
    deleteBook(id) {
        return this.booksService.remove(+id);
    }
};
exports.BooksController = BooksController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "getAllBooks", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe({ errorHttpStatusCode: common_1.HttpStatus.NOT_ACCEPTABLE }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "getBook", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(create_book_validation_pipe_1.CreateBookValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBook]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "createBook", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_book_dto_1.UpdateBookDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "updateBook", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "deleteBook", null);
exports.BooksController = BooksController = __decorate([
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], BooksController);
//# sourceMappingURL=books.controller.js.map