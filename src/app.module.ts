import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
<<<<<<< HEAD
import { AuthMiddleware } from './middileware/auth.middleware.js';
import { DashboardModule } from './dashboard/dashboard.module.js';
import { ConfigModule } from '@nestjs/config';
=======
import { ProductsModule } from './products/products.module.js';
import { ReviewsModule } from './reviews/reviews.module.js';
import { PersonsModule } from './persons/persons.module.js';
>>>>>>> 6116db5 (learn if module use serviece from another module and if two modules use from together)

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
<<<<<<< HEAD
    DashboardModule,
=======
    ProductsModule,
    ReviewsModule,
    PersonsModule,
>>>>>>> 6116db5 (learn if module use serviece from another module and if two modules use from together)
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
