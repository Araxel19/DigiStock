import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // Usamos NestExpressApplication para servir archivos estáticos
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // --- CORS ---
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:8080', // frontend Vue
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // --- Seguridad ---
  app.use(helmet());

  app.use((req, res, next) => {
    res.header('Cross-Origin-Resource-Policy', 'cross-origin');
    res.header('Cross-Origin-Embedder-Policy', 'unsafe-none');
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  // --- Servir archivos estáticos ---
  // Esto permite acceder a las imágenes subidas (ej: /uploads/planillas/archivo.png)
  app.useStaticAssets(join(__dirname, '..', 'app/uploads'), {
    prefix: '/uploads/', // accesible desde http://localhost:3000/uploads/planillas/imagen.png
  });

  // --- Validaciones globales ---
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // Elimina propiedades no definidas en DTOs
      forbidNonWhitelisted: true, // Lanza error si hay campos no permitidos
      transform: true,            // Convierte los tipos automáticamente
    }),
  );

  // --- Prefijo global ---
  app.setGlobalPrefix('api/v1');

  // --- Swagger ---
  const config = new DocumentBuilder()
    .setTitle('DigiStock API')
    .setDescription('Sistema de digitalización de inventario con OCR y n8n')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // --- Puerto ---
  const port = process.env.BACKEND_PORT || 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 DigiStock Backend running on: http://localhost:${port}`);
  console.log(`📂 Static uploads served at: http://localhost:${port}/uploads/planillas/...`);
  console.log(`📚 Swagger Docs: http://localhost:${port}/api/docs`);
  console.log(`📦 API Base Path: http://localhost:${port}/api/v1`);
}

bootstrap();
