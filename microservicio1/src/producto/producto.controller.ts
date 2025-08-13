import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductoDto } from './dto/create-producto.dto';
import { ProductoService } from './producto.service';

@Controller()
export class ProductoMicroserviceController {
  constructor(private readonly productoService: ProductoService) {}

  @MessagePattern({ cmd: 'createProducto' })
  create(@Payload() dto: CreateProductoDto) {
    return this.productoService.create(dto);
  }

  @MessagePattern({ cmd: 'findAllProductos' })
  findAll() {
    return this.productoService.findAll();
  }

  @MessagePattern({ cmd: 'findOneProducto' })
  findOne(@Payload() id: string) {
    return this.productoService.findOne(id);
  }

  @MessagePattern({ cmd: 'updateProducto' })
  update(@Payload() updateData: { id: string; data: Partial<CreateProductoDto> }) {
    return this.productoService.update(updateData.id, updateData.data);
  }

  @MessagePattern({ cmd: 'removeProducto' })
  remove(@Payload() id: string) {
    return this.productoService.remove(id);
  }
}
