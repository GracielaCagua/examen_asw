import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const server = express();
  server.use(cors());

  // Proxy de WebSocket
  const wsProxy = createProxyMiddleware({
    target: 'http://localhost:3004', // microservicio WS real
    changeOrigin: true,
    ws: true,
    pathRewrite: { '^/ws': '' },
  });

  server.use('/ws', wsProxy);

  // Conectar Nest sobre Express
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix('api'); // si quieres prefijo global
  await app.init();

  // HTTP + WS
  const httpServer = createServer(server);
  httpServer.on('upgrade', wsProxy.upgrade); // soporte WS
  httpServer.listen(3006, () => {
    console.log('Gateway corriendo en http://localhost:3006/api');
    console.log('WebSocket proxy accesible en ws://localhost:3006/ws');
  });
}
bootstrap();
