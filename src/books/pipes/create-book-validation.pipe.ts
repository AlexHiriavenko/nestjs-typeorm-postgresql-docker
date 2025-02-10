import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateBook } from '../dto/create-book/create-book.dto'; // Импорт DTO

@Injectable()
export class CreateBookValidationPipe implements PipeTransform {
  async transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.metatype !== CreateBook) {
      return value; // Если это не CreateBookDto — просто передаем дальше
    }

    const object = plainToInstance(CreateBook, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      // throw new BadRequestException('Validation failed');
      throw new BadRequestException(
        errors.map((err) => Object.values(err.constraints ?? {})).flat(),
      );
    }

    return object; // Данные валидны, передаем дальше
  }
}
