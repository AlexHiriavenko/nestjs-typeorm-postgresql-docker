import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Разрешает запросы от любого источника (небезопасно для продакшена)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(process.env.APP_PORT ?? 3000, '0.0.0.0');
}
bootstrap().catch((err) => {
  console.error('Error during app bootstrap:', err);
  process.exit(1); // Завершаем процесс с кодом ошибки
});
