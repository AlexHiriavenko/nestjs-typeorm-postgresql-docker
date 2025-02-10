import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ProductService } from '@/products/product.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'], // ✅ Добавили WebSocket
})
export class SocketService implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  // Список подключенных клиентов (ключ - socket.id)
  private clients = new Map<string, Socket>();

  constructor(private readonly productService: ProductService) {}

  handleConnection(client: Socket): void {
    this.clients.set(client.id, client);
    console.log(`Client connected: ${client.id}`);
    console.log(`Connected clients: ${this.getConnectedClients().length}`);
  }

  handleDisconnect(client: Socket): void {
    this.clients.delete(client.id); // Удаляем клиента при отключении
    console.log(`Client disconnected: ${client.id}`);
    console.log(`Connected clients: ${this.getConnectedClients().length}`);
  }

  getConnectedClients(): string[] {
    return Array.from(this.clients.keys());
  }

  @SubscribeMessage('msg-for-server')
  handleEvent(
    @MessageBody() dto: { text: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(dto);
    const infoForClient = {
      yourMessage: dto.text,
      myAnswer: 'hello client',
      yourSocket_Io_id: client.id,
    };

    client.emit('msg-for-client', infoForClient);
  }

  @SubscribeMessage('find-product')
  async findProduct(
    @MessageBody() dto: { id: number },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(dto);
    try {
      const product = await this.productService.findById(dto.id);
      if (!product) {
        client.emit('find-product-result', {
          message: 'Product not found',
          id: dto.id,
        });
      } else {
        client.emit('find-product-result', product);
      }
    } catch (error) {
      console.error('Error finding product:', error);
      client.emit('error', { message: 'Internal server error' });
    }
  }
}
