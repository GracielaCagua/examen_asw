import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { NATS_SERVICE } from 'src/config';
import { EventosGateway } from 'src/ClientesGateway';

@Controller('clientes')
export class ClientesController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
    private readonly EventosGateway: EventosGateway, // inyectamos el gateway
  ) {}

  @Post()
  async create(@Body() createClienteDto: CreateClienteDto) {
    const result = await this.client.send({ cmd: 'createCliente' }, createClienteDto).toPromise();
    this.EventosGateway.emitData('data', { action: 'create', data: result });
    return result;
  }

  @Get()
  async findAll() {
    const result = await this.client.send({ cmd: 'findAllClientes' }, {}).toPromise();
    this.EventosGateway.emitData('data', { action: 'findAll', data: result });
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.client.send({ cmd: 'findOneCliente' }, id).toPromise();
    this.EventosGateway.emitData('data', { action: 'findOne', data: result });
    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    const result = await this.client.send({ cmd: 'updateCliente' }, { id, data: updateClienteDto }).toPromise();
    this.EventosGateway.emitData('data', { action: 'update', data: result });
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.client.send({ cmd: 'removeCliente' }, id).toPromise();
    this.EventosGateway.emitData('data', { action: 'remove', data: result });
    return result;
  }
}
