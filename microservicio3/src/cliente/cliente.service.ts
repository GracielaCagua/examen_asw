import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(dto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.clienteRepository.create(dto);
    return await this.clienteRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find();
  }

  async findOne(id: string): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({ where: { id } });
    if (!cliente) throw new NotFoundException(`Cliente con id ${id} no encontrado`);
    return cliente;
  }

  async update(id: string, dto: Partial<CreateClienteDto>): Promise<Cliente> {
    const cliente = await this.findOne(id);
    Object.assign(cliente, dto);
    return await this.clienteRepository.save(cliente);
  }

  async remove(id: string): Promise<void> {
    const result = await this.clienteRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Cliente con id ${id} no encontrado`);
  }
}
