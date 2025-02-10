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
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const typeorm_2 = require("typeorm");
let ProductRepository = class ProductRepository {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async findAllWithPagination(perPage, page, search) {
        const query = this.productRepository.createQueryBuilder('product');
        query
            .leftJoinAndSelect('product.category', 'category')
            .take(perPage)
            .skip((page - 1) * perPage);
        if (search) {
            query
                .where('product.name ILIKE :search', { search: `%${search}%` })
                .orWhere('product.color ILIKE :search', { search: `%${search}%` })
                .orWhere('category.name ILIKE :search', { search: `%${search}%` });
        }
        const [products, total] = await query.getManyAndCount();
        const totalPages = Math.ceil(total / perPage);
        return { products, totalPages, page, perPage };
    }
    async getBySearch(perPage, page, search) {
        const whereOptions = search
            ? [
                { name: (0, typeorm_2.ILike)(`%${search}%`) },
                { color: (0, typeorm_2.ILike)(`%${search}%`) },
                { category: { name: (0, typeorm_2.ILike)(`%${search}%`) } },
            ]
            : undefined;
        const [products, total] = await this.productRepository.findAndCount({
            where: whereOptions,
            take: perPage,
            skip: (page - 1) * perPage,
            relations: ['category'],
        });
        const totalPages = Math.ceil(total / perPage);
        return { products, totalPages, page, perPage };
    }
    async findOne(id) {
        return await this.productRepository.findOneBy({ id });
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductRepository);
//# sourceMappingURL=product.repository.js.map