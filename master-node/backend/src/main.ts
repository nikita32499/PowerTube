import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { patchNestJsSwagger, ZodValidationPipe } from 'nestjs-zod';
import { AppModule } from './infrastructure/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('/api/v1');

    app.use(cookieParser());

    app.useGlobalPipes(new ZodValidationPipe());

    setupSwagger(app);

    await app.listen(3001);
}

const setupSwagger = (app: INestApplication) => {
    patchNestJsSwagger();
    const configSwagger = new DocumentBuilder()
        .setTitle('PowerTube Api')
        .setDescription('PowerTube A1111pi')
        .setVersion('1.0.0')
        .build();

    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('/api/swagger', app, document);
};

bootstrap();
