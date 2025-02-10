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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const books_module_1 = require("./books/books.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const categories_module_1 = require("./categories/categories.module");
const products_module_1 = require("./products/products.module");
let AppModule = class AppModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async onModuleInit() {
        try {
            const tables = await this.dataSource
                .createQueryBuilder()
                .select('table_name')
                .from('information_schema.tables', 't')
                .where('table_schema = :schema', { schema: 'public' })
                .getRawMany();
            common_1.Logger.log(process.env.APP_PORT, `📌 Таблицы в БД: ${tables.map((t) => t.table_name).join(', ')}`, 'TypeORM');
        }
        catch (error) {
            common_1.Logger.error('❌ Database connection failed!', error, 'TypeORM');
        }
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get('DB_PORT', 54320),
                    username: configService.get('DB_USER', 'root'),
                    password: configService.get('DB_PASSWORD', 'root'),
                    database: configService.get('DB_NAME', 'test_db'),
                    autoLoadEntities: true,
                    synchronize: false,
                    migrations: [__dirname + '/../migrations/*.{ts,js}'],
                }),
            }),
            books_module_1.BooksModule,
            categories_module_1.CategoriesModule,
            products_module_1.ProductsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AppModule);
//# sourceMappingURL=app.module.js.map