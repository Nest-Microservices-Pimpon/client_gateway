import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';
import { RcpCustomExceptionFilter } from './common';

async function bootstrap() {
  const logger = new Logger('Client-Gateway');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters( new RcpCustomExceptionFilter());
  await app.listen(envs.port);
  logger.log(`Client-Gateway is running on port ${envs.port}`);
}
bootstrap();
