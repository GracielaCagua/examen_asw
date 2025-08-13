import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  async create(dto: CreatePedidoDto): Promise<Pedido> {
    const pedido = this.pedidoRepository.create(dto);
    return await this.pedidoRepository.save(pedido);
  }

  async findAll(): Promise<Pedido[]> {
    return await this.pedidoRepository.find();
  }

  async findOne(id: string): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({ where: { id } });
    if (!pedido) throw new NotFoundException(`Pedido con id ${id} no encontrado`);
    return pedido;
  }

  async update(id: string, dto: Partial<CreatePedidoDto>): Promise<Pedido> {
    const pedido = await this.findOne(id);
    Object.assign(pedido, dto);
    return await this.pedidoRepository.save(pedido);
  }

  async remove(id: string): Promise<void> {
    const result = await this.pedidoRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Pedido con id ${id} no encontrado`);
  }
}
