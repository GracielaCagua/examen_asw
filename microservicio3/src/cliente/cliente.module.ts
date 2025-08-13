import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteMicroserviceController } from './cliente.controller';
import { Cliente } from './entities/cliente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  exports: [TypeOrmModule],
  controllers: [ClienteMicroserviceController],
  providers: [ClienteService],
})
export class ClienteModule { }
