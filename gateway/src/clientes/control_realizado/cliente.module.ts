import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { ClientesController } from './cliente.controller';

@Module({
  imports : [ NatsModule ],
  exports: [ ],
  controllers: [ClientesController],
  providers: [],
})
export class ClienteModule {}
