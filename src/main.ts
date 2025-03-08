import { NestFactory } from '@nestjs/core';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { appConfig, envs } from './configs';
import { CustomExceptionFilter } from './shared/exceptions/error-custom-exception.filter';

async function bootstrap() {
  const logger = new Logger(`Main-${appConfig.APP_NAME}`);

  const app = await NestFactory.create(AppModule);
  const prefix = appConfig.NAMESPACE;

  app.setGlobalPrefix(`${prefix}/api`, {
    exclude: [
      {
        path: '',
        method: RequestMethod.GET,
      },
      {
        path: '/health',
        method: RequestMethod.GET,
      },
    ],
  });

  // pipe options
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new CustomExceptionFilter());

  await app.listen(envs.port);
  logger.log(
    `Main-${appConfig.APP_NAME} is running on: http://localhost:${envs.port}`,
  );
}
bootstrap();
