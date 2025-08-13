import { IsString, IsNumber, IsOptional, IsUrl, Length } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @Length(1, 100)
  tipoProducto: string;

  @IsString()
  @Length(1, 50)
  color: string;

  @IsOptional()
  @IsString()
  @Length(1, 10)
  talla?: string;

  @IsString()
  @Length(1, 255)
  imagenPersonalizada: string;

  @IsNumber()
  precioUnitario: number;
}
