import { Module } from '@nestjs/common';
import { NatsModule } from './transports/nats.module';
import { AuthModule } from './auth/auth.module';
import { ClientesController } from './cliente/cliente.controller';
import { PedidosController } from './pedido/pedido.controller';
import { ProductosController } from './producto/producto.controller';
import { EventosGateway } from './ClientesGateway';


@Module({
  imports: [
    NatsModule,
    AuthModule,
  ],
  providers: [EventosGateway],
  controllers: [ClientesController, PedidosController, ProductosController]
})
export class AppModule { }
