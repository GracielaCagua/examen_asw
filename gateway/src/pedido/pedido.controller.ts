import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { NATS_SERVICE } from 'src/config';
import { EventosGateway } from 'src/ClientesGateway';

@Controller('pedidos')
export class PedidosController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
    private readonly eventosGateway: EventosGateway,
  ) {}

  @Post()
  async create(@Body() createPedidoDto: CreatePedidoDto) {
    const result = await this.client.send({ cmd: 'createPedido' }, createPedidoDto).toPromise();
    this.eventosGateway.emitData('data', { action: 'create', type: 'pedido', data: result });
    return result;
  }

  @Get()
  async findAll() {
    const result = await this.client.send({ cmd: 'findAllPedidos' }, {}).toPromise();
    this.eventosGateway.emitData('data', { action: 'findAll', type: 'pedido', data: result });
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.client.send({ cmd: 'findOnePedido' }, id).toPromise();
    this.eventosGateway.emitData('data', { action: 'findOne', type: 'pedido', data: result });
    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    const result = await this.client.send({ cmd: 'updatePedido' }, { id, data: updatePedidoDto }).toPromise();
    this.eventosGateway.emitData('data', { action: 'update', type: 'pedido', data: result });
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.client.send({ cmd: 'removePedido' }, id).toPromise();
    this.eventosGateway.emitData('data', { action: 'remove', type: 'pedido', data: result });
    return result;
  }
}
