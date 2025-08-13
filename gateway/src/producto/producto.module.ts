import { Module } from '@nestjs/common';
import { EventosGateway } from 'src/ClientesGateway';
import { NatsModule } from 'src/transports/nats.module';
import { ProductosController } from './producto.controller';

@Module({
  imports : [ NatsModule ],
  exports: [ ],
  controllers: [ProductosController],
  providers: [EventosGateway],
})
export class ProductoModule {}
