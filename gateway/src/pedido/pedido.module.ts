import { Module } from '@nestjs/common';
import { EventosGateway } from 'src/ClientesGateway';
import { NatsModule } from 'src/transports/nats.module';
import { PedidosController } from './pedido.controller';

@Module({
  imports : [ NatsModule ],
  exports: [ ],
  controllers: [PedidosController],
  providers: [EventosGateway],
})
export class PedidoModule {}
