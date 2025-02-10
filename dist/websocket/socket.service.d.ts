import { OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ProductService } from '@/products/product.service';
export declare class SocketService implements OnGatewayConnection {
    private readonly productService;
    server: Server;
    private clients;
    constructor(productService: ProductService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    getConnectedClients(): string[];
    handleEvent(dto: {
        text: string;
    }, client: Socket): void;
    findProduct(dto: {
        id: number;
    }, client: Socket): Promise<void>;
}
