import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { EmpleadosController } from './empleado.controller';

@Module({
  imports: [NatsModule],
  controllers: [ EmpleadosController],
  providers: [],
})
export class EmpleadoModule {}
