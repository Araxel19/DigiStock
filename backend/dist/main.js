"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const helmet_1 = require("helmet");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const corsOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:8080', 'http://frontend:80'];
    app.enableCors({
        origin: corsOrigins,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.use((0, helmet_1.default)({ crossOriginEmbedderPolicy: false, crossOriginResourcePolicy: { policy: "cross-origin" } }));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'app/uploads'), {
        prefix: '/uploads/',
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.setGlobalPrefix('api/v1');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('DigiStock API')
        .setDescription('Sistema de digitalización de inventario con OCR y n8n')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.BACKEND_PORT || 3000;
    await app.listen(port, '0.0.0.0');
    console.log(`🚀 DigiStock Backend running on: http://localhost:${port}`);
    console.log(`📂 Static uploads served at: http://localhost:${port}/uploads/planillas/...`);
    console.log(`📚 Swagger Docs: http://localhost:${port}/api/docs`);
    console.log(`📦 API Base Path: http://localhost:${port}/api/v1`);
}
bootstrap();
//# sourceMappingURL=main.js.map