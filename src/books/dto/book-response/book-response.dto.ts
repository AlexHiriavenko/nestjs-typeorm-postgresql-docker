import { Expose, Exclude } from 'class-transformer';

export class BookResponse {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  author: string;

  @Expose()
  published_year?: number;

  @Expose()
  genre?: string;

  @Exclude()
  price?: number;
}
