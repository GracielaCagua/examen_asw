import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [PedidoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
