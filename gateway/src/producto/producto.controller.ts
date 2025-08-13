import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { NATS_SERVICE } from 'src/config';
import { EventosGateway } from 'src/ClientesGateway';

@Controller('productos')
export class ProductosController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
    private readonly eventosGateway: EventosGateway,
  ) {}

  @Post()
  async create(@Body() createProductoDto: CreateProductoDto) {
    const result = await this.client.send({ cmd: 'createProducto' }, createProductoDto).toPromise();
    this.eventosGateway.emitData('data', { action: 'create', type: 'producto', data: result });
    return result;
  }

  @Get()
  async findAll() {
    const result = await this.client.send({ cmd: 'findAllProductos' }, {}).toPromise();
    this.eventosGateway.emitData('data', { action: 'findAll', type: 'producto', data: result });
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.client.send({ cmd: 'findOneProducto' }, id).toPromise();
    this.eventosGateway.emitData('data', { action: 'findOne', type: 'producto', data: result });
    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    const result = await this.client.send({ cmd: 'updateProducto' }, { id, data: updateProductoDto }).toPromise();
    this.eventosGateway.emitData('data', { action: 'update', type: 'producto', data: result });
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.client.send({ cmd: 'removeProducto' }, id).toPromise();
    this.eventosGateway.emitData('data', { action: 'remove', type: 'producto', data: result });
    return result;
  }
}
