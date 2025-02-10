import { DataSource } from 'typeorm';
import { Product } from '@/products/entities/product.entity';

export class ProductSeeder {
  public static async run(dataSource: DataSource): Promise<void> {
    const productRepository = dataSource.getRepository(Product);

    const products = [
      {
        name: 'паспорт обложка №1',
        price: 456,
        img: 'https://cdn.shopify.com/s/files/1/0279/8708/3350/products/CaptureOneCatalog2435.jpg?width=360',
        article: 6543,
        color: 'brawn',
        category: { id: 3 },
      },
      {
        name: 'паспорт обложка №2',
        price: 286,
        img: 'https://cdn.shopify.com/s/files/1/0279/8708/3350/products/22_84671e39-5e92-4d87-b05e-400af907af9a.jpg?width=360',
        article: 8349,
        color: 'gold',
        category: { id: 3 },
      },
      {
        name: 'паспорт обложка №3',
        price: 899,
        img: 'https://cdn.shopify.com/s/files/1/0279/8708/3350/products/18.jpg?width=360',
        article: 1452,
        color: 'brawn',
        category: { id: 3 },
      },
      {
        name: 'паспорт обложка №4',
        price: 112,
        img: 'https://cdn.shopify.com/s/files/1/0279/8708/3350/products/IMG_23381.jpg?width=360',
        article: 4731,
        color: 'red',
        category: { id: 3 },
      },
      {
        name: 'блокнот Викинг',
        price: 539,
        img: 'https://privilegehandmade.com/cdn/shop/products/19_d23edcd4-4af5-42c3-864e-92032e8dded5.jpg?v=1631520697&width=360',
        article: 9281,
        color: 'brawn',
        category: { id: 2 },
      },
      {
        name: 'кошелек Украина',
        price: 384,
        img: 'https://cdn.shopify.com/s/files/1/0279/8708/3350/products/CaptureOneCatalog2385.jpg?width=360',
        article: 6128,
        color: 'brawn',
        category: { id: 4 },
      },
      {
        name: 'кошелек Орел',
        price: 384,
        img: 'https://cdn.shopify.com/s/files/1/0279/8708/3350/products/CaptureOneCatalog2397.jpg?width=360',
        article: 6129,
        color: 'brawn',
        category: { id: 4 },
      },
      {
        name: 'книга Кобзар',
        price: 244,
        img: 'https://privilegehandmade.com/cdn/shop/files/knyha-kobzar-t.shevchenka-v-shkirianii-paliturtsi-ruchnoi-roboty.jpg?width=360',
        article: 4025,
        color: 'gold',
        category: { id: 1 },
      },
      {
        name: 'книга Старый Киев',
        price: 811,
        img: 'https://privilegehandmade.com/cdn/shop/files/elitna-knyha-fotoalbom-v-shkiri-staryi-kyiv-ruchnoi-roboty.jpg?width=360',
        article: 9834,
        color: 'brawn',
        category: { id: 1 },
      },
      {
        name: 'книга 33 Стратегии войны',
        price: 228,
        img: 'https://privilegehandmade.com/cdn/shop/files/knyha-v-shkiri-33-stratehii-voiny-na-podarunok-ruchnoi-roboty.jpg?width=360',
        article: 7798,
        color: 'brown',
        category: { id: 1 },
      },
      {
        name: 'энциклопедия Вино',
        price: 546,
        img: 'https://privilegehandmade.com/cdn/shop/files/podarunkova-kolektsiina-knyha-v-shkiri-vyno-atlas-svitu.jpg?width=360',
        article: 3133,
        color: 'red',
        category: { id: 1 },
      },
      {
        name: 'книга Христианство',
        price: 326,
        img: 'https://cdn.shopify.com/s/files/1/0279/8708/3350/products/Capture-One-Catalog0219.jpg?width=360',
        article: 1930,
        color: 'brawn',
        category: { id: 1 },
      },
      {
        name: 'книга 48 законов власти',
        price: 312,
        img: 'https://privilegehandmade.com/cdn/shop/files/knyha-v-shkiri-na-podarunok-48-zakonov-vlasty-ruchna-robota-chorna.jpg?width=360',
        article: 6725,
        color: 'grey',
        category: { id: 1 },
      },
      {
        name: 'книга Государъ',
        price: 401,
        img: 'https://privilegehandmade.com/cdn/shop/files/elitna-knyha-v-shkiri-hosudar-nikkolo-makiavelli.jpg?width=360',
        article: 2387,
        color: 'gold',
        category: { id: 1 },
      },
      {
        name: 'книга Тарас Шевченко',
        price: 946,
        img: 'https://privilegehandmade.com/cdn/shop/products/Capture-One-Catalog0698.jpg?width=360',
        article: 1429,
        color: 'red',
        category: { id: 1 },
      },
      {
        name: 'книга Napoleon',
        price: 765,
        img: 'https://privilegehandmade.com/cdn/shop/files/podarunkova-knyha-v-shkirianii-paliturtsi-velykie-mysly-napoleona.jpg?width=360',
        article: 9147,
        color: 'brawn',
        category: { id: 1 },
      },
      {
        name: 'книга 33 Стратегии Войны',
        price: 325,
        img: 'https://privilegehandmade.com/cdn/shop/files/knyha-v-shkiri-33-stratehii-voiny-robert-hrin.jpg?width=360',
        article: 8240,
        color: 'grey',
        category: { id: 1 },
      },
    ];

    // await productRepository.upsert(products, ['article']);
    await productRepository.clear();
    await productRepository.insert(products);
    console.log('✅ Products seeded successfully');
  }
}
