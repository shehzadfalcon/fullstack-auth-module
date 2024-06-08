// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import { parse } from 'dotenv';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { ValidationFormatter } from './transformers/validation.transtormer';
import { HttpExceptionFilter } from './custom-exceptions/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from 'process';

const envConfig = parse(readFileSync(path.join(__dirname, '..', '.env')));

for (const k in envConfig) {
  process.env[k] = envConfig[k];
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Sets the global prefix for all routes in the application.
   */
  app.setGlobalPrefix('api/v1');

  /**
   * Sets the global logging interceptor for the application.
   */
  app.useGlobalInterceptors(new LoggingInterceptor());

  /**
   * Sets the global validation pipe with custom exception handling and object transformation disabled.
   */
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: any) =>
        new UnprocessableEntityException(ValidationFormatter(errors)),

      transform: false, // transform object to DTO class
    }),
  );

  /**
   * Sets the global HTTP exception filter using the provided HTTP adapter.
   */
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));
  app.enableCors();
  /**
   * Configures Swagger documentation for fullstack-auth-module RESTful APIs with authentication support.
   */
  const config = new DocumentBuilder()
    .setTitle('fullstack-auth-module')
    .setDescription('Fullstack Auth Module Restful APIs')
    .setVersion('1.0')
    .addTag('fullstack-auth-module')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  const PORT = env.PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
