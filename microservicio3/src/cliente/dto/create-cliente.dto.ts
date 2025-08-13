import { IsString, Length } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @Length(1, 100)
  nombre: string;

  @IsString()
  @Length(1, 50)
  pais: string;

  @IsString()
  @Length(1, 50)
  ciudad: string;

  @IsString()
  @Length(1, 20)
  codigoPostal: string;

  @IsString()
  @Length(1, 255)
  direccion: string;

  @IsString()
  @Length(1, 20)
  telefono: string;
}
