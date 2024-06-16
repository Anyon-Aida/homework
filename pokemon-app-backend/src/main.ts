import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();  // Engedélyezzük a CORS-t
  await app.listen(3000);
}
bootstrap();
