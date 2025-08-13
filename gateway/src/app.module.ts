import { Module } from '@nestjs/common';
import { NatsModule } from './transports/nats.module';
import { AuthModule } from './auth/auth.module';
import { ClientesController } from './cliente/cliente.controller';
import { PedidosController } from './pedido/pedido.controller';
import { ProductosController } from './producto/producto.controller';
import { EventosGateway } from './ClientesGateway';
import { ProductoModule } from './producto/producto.module';
import { ClienteModule } from './cliente/cliente.module';
import { PedidoModule } from './pedido/pedido.module';


@Module({
  imports: [
    NatsModule,
    AuthModule,
    ProductoModule,
    ClienteModule,
    PedidoModule
  ],
  providers: [],
  controllers: []
})
export class AppModule { }
