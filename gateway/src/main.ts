import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');

  // Crear instancia de Express
  const server = express();
  server.use(cors());

  // Configurar proxy (reutilizable)
  const wsProxy = createProxyMiddleware({
    target: 'http://localhost:3004', // tu microservicio WS
    changeOrigin: true,
    ws: true,
    pathRewrite: { '^/ws': '' },
  });
  server.use('/ws', wsProxy);

  // Crear Nest sobre Express
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new RpcCustomExceptionFilter());

  // Crear servidor HTTP y habilitar WebSocket upgrade
  const httpServer = createServer(server);
  httpServer.on('upgrade', wsProxy.upgrade);

  await new Promise<void>((resolve) => httpServer.listen(envs.port, resolve));
  logger.log(`Gateway running on port ${envs.port}`);
  logger.log(`WebSocket proxy accessible at ws://localhost:${envs.port}/ws`);
}

bootstrap();
