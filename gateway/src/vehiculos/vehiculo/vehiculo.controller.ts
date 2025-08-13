// src/modules/vehiculos/vehiculos.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { NATS_SERVICE } from '../../config';
import { ClientProxy } from '@nestjs/microservices';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';

@Controller('vehiculos')
export class VehiculosController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createVehiculoDto: CreateVehiculoDto) {
    return this.client.send({ cmd: 'createVehiculo' }, createVehiculoDto);
  }

  @Get()
  async findAll() {
    return this.client.send({ cmd: 'findAllVehiculos' }, {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'findOneVehiculo' }, +id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVehiculoDto: UpdateVehiculoDto,
  ) {
    return this.client.send(
      { cmd: 'updateVehiculo' },
      { id: +id, ...updateVehiculoDto },
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.client.send({ cmd: 'removeVehiculo' }, +id);
  }

  @Get('por-tipo/:tipoId')
  async findByTipo(@Param('tipoId') tipoId: string) {
    return this.client.send({ cmd: 'findVehiculosByTipo' }, +tipoId);
  }

  @Get('disponibles/:fechaInicio/:fechaFin')
  async findDisponibles(
    @Param('fechaInicio') fechaInicio: string,
    @Param('fechaFin') fechaFin: string,
  ) {
    return this.client.send(
      { cmd: 'findVehiculosDisponibles' },
      { fechaInicio, fechaFin },
    );
  }
}