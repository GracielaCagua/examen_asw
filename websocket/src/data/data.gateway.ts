import { Injectable, Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
@Injectable()
export class DataGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  wss: Server;

  private readonly logger = new Logger(DataGateway.name);
  private connectedClients = new Set<string>();

  handleConnection(client: Socket) {
    this.connectedClients.add(client.id);
    this.logger.log(`Cliente conectado: ${client.id}`);
    this.logger.log(`Total clientes conectados: ${this.connectedClients.size}`);
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);
    this.logger.log(`Cliente desconectado: ${client.id}`);
    this.logger.log(`Total clientes conectados: ${this.connectedClients.size}`);
  }

  @SubscribeMessage('data')
  handleResultadoAdded(@MessageBody() data: any): void {
    this.logger.log('Nueva consulta', data);
    this.wss.emit('data', data);
  }
}
