import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository, ILike } from 'typeorm';
// import { Brackets } from 'typeorm';

export type FilteredProductsType = {
  products: Product[];
  totalPages: number;
  page: number;
  perPage: number;
};

// @Injectable()
// export class ProductRepository extends Repository<Product> {
//   constructor(private readonly dataSource: DataSource) {
//     super(Product, dataSource.createEntityManager());
//   }
// }

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAllWithPagination(
    perPage: number,
    page: number,
    search?: string,
  ): Promise<FilteredProductsType> {
    const query = this.productRepository.createQueryBuilder('product');

    query
      .leftJoinAndSelect('product.category', 'category')
      .take(perPage)
      .skip((page - 1) * perPage);

    if (search) {
      query
        .where('product.name ILIKE :search', { search: `%${search}%` })
        .orWhere('product.color ILIKE :search', { search: `%${search}%` })
        .orWhere('category.name ILIKE :search', { search: `%${search}%` });
    }

    // if (search) {
    //   query.andWhere(
    //     new Brackets((qb) => {
    //       qb.where('product.name ILIKE :search', { search: `%${search}%` })
    //         .orWhere('product.color ILIKE :search', { search: `%${search}%` })
    //         .orWhere('category.name ILIKE :search', { search: `%${search}%` });
    //     }),
    //   );
    // }

    const [products, total] = await query.getManyAndCount();
    const totalPages = Math.ceil(total / perPage);

    return { products, totalPages, page, perPage };
  }

  async getBySearch(
    perPage: number,
    page: number,
    search?: string,
  ): Promise<FilteredProductsType> {
    const whereOptions = search
      ? [
          { name: ILike(`%${search}%`) },
          { color: ILike(`%${search}%`) },
          { category: { name: ILike(`%${search}%`) } },
        ]
      : undefined;

    const [products, total] = await this.productRepository.findAndCount({
      where: whereOptions,
      take: perPage,
      skip: (page - 1) * perPage,
      relations: ['category'],
    });

    const totalPages = Math.ceil(total / perPage);

    return { products, totalPages, page, perPage };
  }
}
