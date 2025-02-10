import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { ProductsModule } from '@/products/products.module';

@Module({
  imports: [ProductsModule],
  providers: [SocketService],
})
export class SocketModule {}
