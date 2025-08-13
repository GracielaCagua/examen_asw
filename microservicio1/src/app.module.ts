import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto/entities/producto.entity';
import { ProductoModule } from './producto/producto.module';

@Module({
  imports: [
    ProductoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres.owshbfxqwuulpengmovc:123123123@aws-0-us-east-2.pooler.supabase.com:6543/postgres',
      autoLoadEntities: true,
      synchronize: true, 
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    }),
  ],
  providers: [],
})
export class AppModule {}
