import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 50 })
  pais: string;

  @Column({ length: 50 })
  ciudad: string;

  @Column({ length: 20 })
  codigoPostal: string;

  @Column({ length: 255 })
  direccion: string;

  @Column({ length: 20 })
  telefono: string;
}
