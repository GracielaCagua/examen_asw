import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoMicroserviceController } from './pedido.controller';
import { Pedido } from './entities/pedido.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido])],
  exports: [TypeOrmModule],
  controllers: [PedidoMicroserviceController],
  providers: [PedidoService],
})
export class PedidoModule { }
