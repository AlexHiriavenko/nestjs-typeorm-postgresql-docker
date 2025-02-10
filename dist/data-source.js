"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const typeorm_1 = require("typeorm");
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'test_db',
    entities: [__dirname + '/**/*.entity.{ts,js}'],
    migrations: ['src/migrations/*.{ts,js}'],
    synchronize: false,
    logging: true,
});
console.log('✅ DATA SOURCE LOADED!');
exports.default = AppDataSource;
//# sourceMappingURL=data-source.js.map