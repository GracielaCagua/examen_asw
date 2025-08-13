// src/gateways/eventos.gateway.ts
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(3005, { cors: true })
export class EventosGateway {
  @WebSocketServer()
  server: Server;

  emitData(event: string, payload: any) {
    this.server.emit(event, payload);
  }
}
