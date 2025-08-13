import { Module } from '@nestjs/common';
import { EmpleadoModule } from './empleado/getion_interna.module';

@Module({
  controllers: [],
  providers: [],
  imports: [ EmpleadoModule ]
})
export class GestionInternaModule {}
