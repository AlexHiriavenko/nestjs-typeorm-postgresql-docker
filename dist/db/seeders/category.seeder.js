"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySeeder = void 0;
const category_entity_1 = require("../../categories/entities/category.entity");
class CategorySeeder {
    static async run(dataSource) {
        const categoryRepository = dataSource.getRepository(category_entity_1.Category);
        const categories = [
            { name: 'Books' },
            { name: 'Notebooks' },
            { name: 'Covers' },
            { name: 'Purses' },
        ];
        await categoryRepository.upsert(categories, ['name']);
        console.log('✅ Categories seeded successfully');
    }
}
exports.CategorySeeder = CategorySeeder;
//# sourceMappingURL=category.seeder.js.map