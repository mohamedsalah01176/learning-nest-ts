import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
// import { AuthMiddlewareFunction } from './auth/auth.middleware.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  // using middleware
  // app.use(AuthMiddlewareFunction)

  // using global guard
  // app.useGlobalGuards(new globalGard())


  // using global pipe
  // app.useGlobalPipes(new ValidationPipe(
  //   {
  //     whitelist:true,
  //     forbidNonWhitelisted:true,
  //   }
  // ))
  await app.listen(process.env.PORT ?? 5000);
}
await bootstrap();
