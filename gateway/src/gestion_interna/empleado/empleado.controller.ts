// src/modules/administracion/empleados.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { NATS_SERVICE } from '../../config';
import { ClientProxy } from '@nestjs/microservices';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';

@Controller('empleados')
export class EmpleadosController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return this.client.send({ cmd: 'createEmpleado' }, createEmpleadoDto);
  }

  @Get()
  async findAll() {
    return this.client.send({ cmd: 'findAllEmpleados' }, {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'findOneEmpleado' }, +id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmpleadoDto: UpdateEmpleadoDto,
  ) {
    return this.client.send(
      { cmd: 'updateEmpleado' },
      { id: +id, ...updateEmpleadoDto },
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.client.send({ cmd: 'removeEmpleado' }, +id);
  }

  @Get('por-cargo/:cargo')
  async findByCargo(@Param('cargo') cargo: string) {
    return this.client.send({ cmd: 'findEmpleadosByCargo' }, cargo);
  }

  @Get(':id/sucursal')
  async getSucursal(@Param('id') id: string) {
    return this.client.send({ cmd: 'getSucursalEmpleado' }, +id);
  }

  @Post(':id/asignar-sucursal')
  async asignarSucursal(
    @Param('id') id: string,
    @Body() { sucursalId }: { sucursalId: number },
  ) {
    return this.client.send(
      { cmd: 'asignarSucursalEmpleado' },
      { empleadoId: +id, sucursalId },
    );
  }
}