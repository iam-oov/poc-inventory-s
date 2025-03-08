import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';
import { appConfig, envs } from './configs';

async function bootstrap() {
  const logger = new Logger(`Main-${appConfig.APP_NAME}`);

  const app = await NestFactory.create(AppModule);
  await app.listen(envs.port);
  logger.log(
    `Main-${appConfig.APP_NAME} is running on: http://localhost:${envs.port}`,
  );
}
bootstrap();
