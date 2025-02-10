import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class CreateBookValidationPipe implements PipeTransform {
    transform(value: unknown, metadata: ArgumentMetadata): Promise<unknown>;
}
