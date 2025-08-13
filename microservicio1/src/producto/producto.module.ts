import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoMicroserviceController } from './producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto])],
  exports: [TypeOrmModule],
  controllers: [ProductoMicroserviceController],
  providers: [ProductoService],
})
export class ProductoModule {}
