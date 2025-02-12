"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_book_dto_1 = require("../dto/create-book/create-book.dto");
let CreateBookValidationPipe = class CreateBookValidationPipe {
    async transform(value, metadata) {
        if (metadata.metatype !== create_book_dto_1.CreateBook) {
            return value;
        }
        const object = (0, class_transformer_1.plainToInstance)(create_book_dto_1.CreateBook, value);
        const errors = await (0, class_validator_1.validate)(object);
        if (errors.length > 0) {
            throw new common_1.BadRequestException(errors.map((err) => Object.values(err.constraints ?? {})).flat());
        }
        return object;
    }
};
exports.CreateBookValidationPipe = CreateBookValidationPipe;
exports.CreateBookValidationPipe = CreateBookValidationPipe = __decorate([
    (0, common_1.Injectable)()
], CreateBookValidationPipe);
//# sourceMappingURL=create-book-validation.pipe.js.map