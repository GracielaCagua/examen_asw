import { Module } from '@nestjs/common';
import { ClienteModule } from './control_realizado/cliente.module';

@Module({
  controllers: [],
  providers: [],
  imports: [ClienteModule]
})
export class GestionClienteModule {}
