import { Logger } from '@nestjs/common';
import {
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnGatewayConnection } from './../../node_modules/@nestjs/websockets/interfaces/hooks/on-gateway-connection.interface.d';

@WebSocketGateway({ cors: true }) // Можно настроить CORS, если требуется
export class ProxyGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    private readonly logger = new Logger(ProxyGateway.name);

    declare server: Server;

    @SubscribeMessage('message')
    handleMessage(client: Socket, payload: string): string {
        this.logger.log(`Message received: ${payload}`);
        return 'Hello from server!';
    }

    afterInit(server: Server) {
        this.server = server;
        this.logger.log('WebSocket server initialized');
    }

    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
}
