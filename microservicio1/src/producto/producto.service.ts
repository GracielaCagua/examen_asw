import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(dto: CreateProductoDto): Promise<Producto> {
    const producto = this.productoRepository.create(dto);
    return await this.productoRepository.save(producto);
  }

  async findAll(): Promise<Producto[]> {
    return await this.productoRepository.find();
  }

  async findOne(id: string): Promise<Producto> {
    const producto = await this.productoRepository.findOne({ where: { id } });
    if (!producto) throw new NotFoundException(`Producto con id ${id} no encontrado`);
    return producto;
  }

  async update(id: string, dto: Partial<CreateProductoDto>): Promise<Producto> {
    const producto = await this.findOne(id);
    Object.assign(producto, dto);
    return await this.productoRepository.save(producto);
  }

  async remove(id: string): Promise<void> {
    const result = await this.productoRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Producto con id ${id} no encontrado`);
  }
}
