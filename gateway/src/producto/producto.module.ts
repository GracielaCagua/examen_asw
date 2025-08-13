import { Module } from "@nestjs/common";
import { ProductosController } from "./producto.controller";

@Module({
    imports: [],
    providers: [],
    controllers: [ProductosController]
})
export class ProductoModule { }

