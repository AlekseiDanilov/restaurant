import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function doit() {
  const app = await NestFactory.create(AppModule);
  await app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  await app.listen(3001);
}

doit();
