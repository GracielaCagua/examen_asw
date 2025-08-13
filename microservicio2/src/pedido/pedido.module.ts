import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoMicroserviceController } from './pedido.controller';

@Module({
  controllers: [PedidoMicroserviceController],
  providers: [PedidoService],
})
export class PedidoModule {}
