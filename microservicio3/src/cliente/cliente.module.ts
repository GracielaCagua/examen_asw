import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteMicroserviceController } from './cliente.controller';

@Module({
  controllers: [ClienteMicroserviceController],
  providers: [ClienteService],
})
export class ClienteModule {}
