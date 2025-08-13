import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Controller()
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @MessagePattern('createPedido')
  create(@Payload() createPedidoDto: CreatePedidoDto) {
    return this.pedidoService.create(createPedidoDto);
  }

  @MessagePattern('findAllPedido')
  findAll() {
    return this.pedidoService.findAll();
  }

  @MessagePattern('findOnePedido')
  findOne(@Payload() id: number) {
    return this.pedidoService.findOne(id);
  }

  @MessagePattern('updatePedido')
  update(@Payload() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidoService.update(updatePedidoDto.id, updatePedidoDto);
  }

  @MessagePattern('removePedido')
  remove(@Payload() id: number) {
    return this.pedidoService.remove(id);
  }
}
