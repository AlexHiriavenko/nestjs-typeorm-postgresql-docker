"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSeeder = void 0;
const product_entity_1 = require("../../products/entities/product.entity");
const productsCollection_1 = require("./productsCollection");
class ProductSeeder {
    static async run(dataSource) {
        const productRepository = dataSource.getRepository(product_entity_1.Product);
        await productRepository.clear();
        await productRepository.insert(productsCollection_1.PRODUCTS);
        console.log('✅ Products seeded successfully');
    }
}
exports.ProductSeeder = ProductSeeder;
//# sourceMappingURL=product.seeder.js.map