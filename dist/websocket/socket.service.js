"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketService = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const product_service_1 = require("../products/product.service");
let SocketService = class SocketService {
    constructor(productService) {
        this.productService = productService;
        this.clients = new Map();
    }
    handleConnection(client) {
        this.clients.set(client.id, client);
        console.log(`Client connected: ${client.id}`);
        console.log(`Connected clients: ${this.getConnectedClients().length}`);
    }
    handleDisconnect(client) {
        this.clients.delete(client.id);
        console.log(`Client disconnected: ${client.id}`);
        console.log(`Connected clients: ${this.getConnectedClients().length}`);
    }
    getConnectedClients() {
        return Array.from(this.clients.keys());
    }
    handleEvent(dto, client) {
        console.log(dto);
        const infoForClient = {
            yourMessage: dto.text,
            myAnswer: 'hello client',
            yourSocket_Io_id: client.id,
        };
        client.emit('msg-for-client', infoForClient);
    }
    async findProduct(dto, client) {
        console.log(dto);
        try {
            const product = await this.productService.findById(dto.id);
            if (!product) {
                client.emit('find-product-result', {
                    message: 'Product not found',
                    id: dto.id,
                });
            }
            else {
                client.emit('find-product-result', product);
            }
        }
        catch (error) {
            console.error('Error finding product:', error);
            client.emit('error', { message: 'Internal server error' });
        }
    }
};
exports.SocketService = SocketService;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SocketService.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('msg-for-server'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], SocketService.prototype, "handleEvent", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('find-product'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], SocketService.prototype, "findProduct", null);
exports.SocketService = SocketService = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], SocketService);
//# sourceMappingURL=socket.service.js.map