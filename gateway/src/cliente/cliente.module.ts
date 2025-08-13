import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { ClientesController } from './cliente.controller';
import { EventosGateway } from 'src/ClientesGateway';

@Module({
  imports : [ NatsModule ],
  exports: [ ],
  controllers: [ClientesController],
  providers: [EventosGateway],
})
export class ClienteModule {}
