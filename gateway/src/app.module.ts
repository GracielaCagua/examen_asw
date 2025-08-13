import { Module } from '@nestjs/common';
import { NatsModule } from './transports/nats.module';
import { AuthModule } from './auth/auth.module';
import { AdministracionVehiculosModule } from './vehiculos/vehiculo.module';
import { GestionInternaModule } from './gestion_interna/getion_interna.module';
import { Client } from '@nestjs/microservices';
import { ClienteModule } from './clientes/control_realizado/cliente.module';
import { GestionClienteModule } from './clientes/gestion_cliente.module';


@Module({
  imports: [
    NatsModule,
    AuthModule,
    AdministracionVehiculosModule,
    GestionInternaModule,
    GestionClienteModule
  ],
})
export class AppModule { }
