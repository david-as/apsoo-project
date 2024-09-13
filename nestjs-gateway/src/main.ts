import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsulService } from './consul.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const consulService = app.get(ConsulService);

  await consulService.registerService();
  await app.listen(process.env.SERVICE_PORT || 8080);
}
bootstrap();
