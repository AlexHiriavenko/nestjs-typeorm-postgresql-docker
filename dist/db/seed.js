"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const category_seeder_1 = require("./seeders/category.seeder");
const product_seeder_1 = require("./seeders/product.seeder");
async function seedDatabase() {
    const dataSource = await data_source_1.default.initialize();
    console.log('🌱 Starting database seeding...');
    await category_seeder_1.CategorySeeder.run(dataSource);
    await product_seeder_1.ProductSeeder.run(dataSource);
    await dataSource.destroy();
    console.log('🌱 Seeding completed!');
}
seedDatabase().catch((error) => {
    console.error('❌ Error during seeding:', error);
});
//# sourceMappingURL=seed.js.map