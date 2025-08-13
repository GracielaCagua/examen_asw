import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { ClienteService } from './cliente.service';

@Controller()
export class ClienteMicroserviceController {
  constructor(private readonly clienteService: ClienteService) {}

  @MessagePattern({ cmd: 'createCliente' })
  create(@Payload() dto: CreateClienteDto) {
    return this.clienteService.create(dto);
  }

  @MessagePattern({ cmd: 'findAllClientes' })
  findAll() {
    return this.clienteService.findAll();
  }

  @MessagePattern({ cmd: 'findOneCliente' })
  findOne(@Payload() id: string) {
    return this.clienteService.findOne(id);
  }

  @MessagePattern({ cmd: 'updateCliente' })
  update(@Payload() updateData: { id: string; data: Partial<CreateClienteDto> }) {
    return this.clienteService.update(updateData.id, updateData.data);
  }

  @MessagePattern({ cmd: 'removeCliente' })
  remove(@Payload() id: string) {
    return this.clienteService.remove(id);
  }
}
