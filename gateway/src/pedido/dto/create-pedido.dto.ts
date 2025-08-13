import { IsInt, IsNumber, IsString, Length } from 'class-validator';

export class CreatePedidoDto {
  @IsInt()
  cantidad: number;

  @IsNumber()
  total: number;

  @IsString()
  @Length(1, 50)
  metodoPago: string;

  @IsString()
  @Length(1, 50)
  estadoPedido: string;
}
