import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [
    PedidoModule,
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
