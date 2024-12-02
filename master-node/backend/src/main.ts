import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { ZodValidationPipe } from 'nestjs-zod';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/api');

    app.use(cookieParser());

    app.useGlobalPipes(new ZodValidationPipe());

    await app.listen(3001);
}

bootstrap();
