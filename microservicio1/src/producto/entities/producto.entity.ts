import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  tipoProducto: string;

  @Column({ length: 50 })
  color: string;

  @Column({ length: 10, nullable: true })
  talla: string;

  @Column({ length: 255 })
  imagenPersonalizada: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precioUnitario: number;
}
