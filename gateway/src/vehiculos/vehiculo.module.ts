import { Module } from '@nestjs/common';
import { VehiculoModule } from './vehiculo/control_realizado.module';

@Module({
  controllers: [],
  providers: [],
  imports: [VehiculoModule]
})
export class AdministracionVehiculosModule {}
