import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { AuthMiddleware } from './middileware/auth.middleware.js';
import { DashboardModule } from './dashboard/dashboard.module.js';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module.js';
import { ReviewsModule } from './reviews/reviews.module.js';
import { PersonsModule } from './persons/persons.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/users.entity.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    DashboardModule,
    ProductsModule,
    ReviewsModule,
    PersonsModule,
    TypeOrmModule.forRoot({
      type:"postgres",
      database:"nestjs-app-learn",
      username:"postgres",
      password:"01155953141Az",
      port:5432,
      host:"localhost",
      synchronize:true, // develop mode only
      entities:[User]
    })
  ],
  controllers: [AppController],
  providers: [AppService],  
  
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("dashboard")
    // consumer.apply(AuthMiddleware).forRoutes("*")
  }
}
