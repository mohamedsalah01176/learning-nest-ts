import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
// import { AuthMiddlewareFunction } from './auth/auth.middleware.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  // app.use(AuthMiddlewareFunction)
  // app.useGlobalGuards(new globalGard())
  await app.listen(process.env.PORT ?? 5000);
}
await bootstrap();
