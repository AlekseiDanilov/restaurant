import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function doit() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}

doit();
