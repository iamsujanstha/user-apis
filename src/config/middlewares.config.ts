import { INestApplication, ValidationPipe } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationExceptionFilter } from 'src/shared/filters/validation-exception.filter';
// import cookieParser from 'cookie-parser';
// import express from 'express';
// import { RolesGuard } from '@shared/guards/roles.guard';

function setupGlobalPrefix(app: INestApplication) {
  app.setGlobalPrefix('api');
}

function enableCors(app: INestApplication) {
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
}

function setupGlobalPipes(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
}

// function setupGlobalGuards(app: INestApplication) {
//   app.useGlobalGuards(new RolesGuard(app.get(Reflector)));
// }

// function setupMiddleware(app: INestApplication) {
//   app.use(express.urlencoded({ extended: true }));
//   app.use(cookieParser());
// }

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Nest-js Swagger Example API')
    .setDescription('Swagger Example API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
}

function setupFilters(app: INestApplication) {
  app.useGlobalFilters(new ValidationExceptionFilter());
}

export function setupMiddlewares(app: INestApplication) {
  setupGlobalPrefix(app);
  enableCors(app);
  setupGlobalPipes(app);
  // setupGlobalGuards(app);
  // setupMiddleware(app);
  setupSwagger(app);
  setupFilters(app);
}
