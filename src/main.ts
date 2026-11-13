import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { AuthMiddlewareFunction } from './auth/auth.middleware.js';
import helmet from 'helmet';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  const swaggerConfig = new DocumentBuilder()
  .setTitle("Learing Nest Js")
  .setVersion("1.0.0")
  .addSecurity("bearer",{type:"http", scheme:"bearer"})
  .addBearerAuth()
  .build();
  const swaggerDocument= SwaggerModule.createDocument(app,swaggerConfig);
  
  SwaggerModule.setup("swagger",app,swaggerDocument)

  // using middleware
  // app.use(AuthMiddlewareFunction)

  // using global guard
  // app.useGlobalGuards(new globalGard())
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted:true
  }))

//   app.enableCors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//   credentials: true,
// });

  app.use(helmet());

  app.enableCsrfProtection();

  await app.listen(process.env.PORT ?? 5000);
}
await bootstrap();
