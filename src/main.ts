import { BetterLogger } from '@einsenundnullen/better-nestjs-logger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(BetterLogger));
  app.enableShutdownHooks();
  await app.listen(8080);
}
bootstrap();
