import { Module } from '@nestjs/common';
import { ClienteModule } from './cliente/cliente.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres.owshbfxqwuulpengmovc:123123123@aws-0-us-east-2.pooler.supabase.com:6543/postgres',
      autoLoadEntities: true,
      synchronize: true, // ¡Cuidado! Solo para desarrollo, desactivar en producción
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    }),
    ClienteModule,
  ],
  providers: [],
})
export class AppModule {}
