# основы Nestjs

## настройка проекта:

1. cp .env.example .env
2. docker-compose build
3. docker-compose up -d
4. npm i
5. npm run migration:run ()
6. npm run seed
7. npm run start:dev

## порты:

- База данных: localhost:54320 (PostgreSQL)
- pgAdmin: http://localhost:5050 (логин: admin@example.com, пароль: root)
- NestJS API: http://localhost:3000 (если используется стандартный порт)

## полезные NestJS CLI команды:

$ nest g resource `name`.
$ nest g module `name`
$ nest g controller `name` --no-spec
$ nest g service `name` --no-spec
$ nest g provider `name`.repository
$ nest g class `name`/`name`.entity

## скрипты для миграций:

смотрите в package.json

## запросы в pg-admin

- Выбери "Query Tool" в меню (или нажми F5 в окне SQL-запросов).
- TRUNCATE TABLE migrations RESTART IDENTITY; ( очищает таблицу миграций, сбрасывает счетчик идентификаторов.)
