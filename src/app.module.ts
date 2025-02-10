import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { SocketModule } from './websocket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 54320),
        username: configService.get<string>('DB_USER', 'root'),
        password: configService.get<string>('DB_PASSWORD', 'root'),
        database: configService.get<string>('DB_NAME', 'test_db'),
        autoLoadEntities: true,
        synchronize: false,
        migrations: [__dirname + '/../migrations/*.{ts,js}'],
      }),
    }),
    BooksModule,
    CategoriesModule,
    ProductsModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    try {
      const tables = await this.dataSource
        .createQueryBuilder()
        .select('table_name')
        .from('information_schema.tables', 't')
        .where('table_schema = :schema', { schema: 'public' })
        .getRawMany<{ table_name: string }>();

      Logger.log(
        process.env.APP_PORT,
        `📌 Таблицы в БД: ${tables.map((t) => t.table_name).join(', ')}`,
        'TypeORM',
      );
    } catch (error) {
      Logger.error('❌ Database connection failed!', error, 'TypeORM');
    }
  }
}
