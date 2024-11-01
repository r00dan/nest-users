import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { LoggerInterceptor } from 'core/interceptors/logger.interceptor';
import { Environment } from 'enums';

function injectSwagger(app: INestApplication) {
  if (process.env.NODE_ENV === Environment.DEV) {
    const config = new DocumentBuilder()
      .addCookieAuth('refresh')
      .addBasicAuth()
      .addBearerAuth()
      .setTitle('nest-users')
      .setDescription('API')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('swagger', app, document, {
      swaggerOptions: {
        tagsSorter: 'alpha',
        operationsSorter: 'method',
      },
    });
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();
  app.use(cookieParser('nest-users-super-secret'));
  app.enableCors({
    origin: true,
    methods: 'GET,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalInterceptors(new LoggerInterceptor());

  injectSwagger(app);

  await app.listen(process.env.BIND || 8080);
}

bootstrap();
