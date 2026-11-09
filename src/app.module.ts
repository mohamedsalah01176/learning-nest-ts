import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { AuthMiddleware } from './middileware/auth.middleware.js';
import { DashboardModule } from './dashboard/dashboard.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module.js';
import { ReviewsModule } from './reviews/reviews.module.js';
import { PersonsModule } from './persons/persons.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/users.entity.js';
import { Product } from './products/entities/product.entity.js';
import { Review } from './reviews/entities/review.entity.js';
import { UserDetails } from './users/entities/userDetails.entity.js';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UploadsModule } from './uploads/uploads.module.js';
import { MailModule } from './mail/mail.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();


@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    UsersModule,
    DashboardModule,
    ProductsModule,
    ReviewsModule,
    PersonsModule,
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>{
        console.log({
        host: config.get('DB_HOST'),
        database: config.get('DB_DATABASE'),
        passwordExists: Boolean(config.get('DB_PASSWORD')),
      });
        
        return{
          type:"postgres",
          database:config.get<string>("DB_DATABASE") || config.get<string>("DB_DATBASE"),
          username:config.get<string>("DB_USERNAME"),
          password:String(config.get<string>("DB_PASSWORD") ?? ""),
          port:Number(config.get<string>("DB_PORT") || 5432),
          host:config.get<string>("DB_HOST") || "localhost",
          synchronize:process.env.NODE_ENV !== "production", // develop mode only
          entities:[User,Product,Review,UserDetails]
        }
      }
    }),
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:`.env.${process.env.NODE_ENV || 'development'}`
    }),
    UploadsModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService ,{
    provide:APP_INTERCEPTOR,
    useClass:ClassSerializerInterceptor
  }],  
  
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("dashboard")
    // consumer.apply(AuthMiddleware).forRoutes("*")
  }
}
