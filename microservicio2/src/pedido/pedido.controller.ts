import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { PedidoService } from './pedido.service';

@Controller()
export class PedidoMicroserviceController {
  constructor(private readonly pedidoService: PedidoService) {}

  @MessagePattern({ cmd: 'createPedido' })
  create(@Payload() dto: CreatePedidoDto) {
    return this.pedidoService.create(dto);
  }

  @MessagePattern({ cmd: 'findAllPedidos' })
  findAll() {
    return this.pedidoService.findAll();
  }

  @MessagePattern({ cmd: 'findOnePedido' })
  findOne(@Payload() id: string) {
    return this.pedidoService.findOne(id);
  }

  @MessagePattern({ cmd: 'updatePedido' })
  update(@Payload() updateData: { id: string; data: Partial<CreatePedidoDto> }) {
    return this.pedidoService.update(updateData.id, updateData.data);
  }

  @MessagePattern({ cmd: 'removePedido' })
  remove(@Payload() id: string) {
    return this.pedidoService.remove(id);
  }
}
