import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { VehiculosController } from './vehiculo.controller';

@Module({
  imports : [ NatsModule ],
  exports: [ ],
  controllers: [VehiculosController],
  providers: [],
})
export class VehiculoModule {}
