// src/modules/clientes/clientes.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { NATS_SERVICE } from '../../config';
import { ClientProxy } from '@nestjs/microservices';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createClienteDto: CreateClienteDto) {
    return this.client.send({ cmd: 'createCliente' }, createClienteDto);
  }

  @Get()
  async findAll() {
    return this.client.send({ cmd: 'findAllClientes' }, {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'findOneCliente' }, +id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    return this.client.send(
      { cmd: 'updateCliente' },
      { id: +id, ...updateClienteDto },
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.client.send({ cmd: 'removeCliente' }, +id);
  }

  @Get('por-identificacion/:identificacion')
  async findByIdentificacion(@Param('identificacion') identificacion: string) {
    return this.client.send(
      { cmd: 'findClienteByIdentificacion' },
      identificacion,
    );
  }

  @Get(':id/historial-alquileres')
  async getHistorialAlquileres(@Param('id') id: string) {
    return this.client.send(
      { cmd: 'getHistorialAlquileresByCliente' },
      +id,
    );
  }
}