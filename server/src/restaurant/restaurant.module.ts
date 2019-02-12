import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {RestaurantService} from './restaurant.service';
import {RestaurantController} from './restaurant.controller';
import {CookieParserMiddleware} from "@nest-middlewares/cookie-parser";
import {Db} from "../db/db";

@Module({
  providers: [RestaurantService, Db],
  controllers: [RestaurantController]
})
export class RestaurantModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer {
    return consumer.apply(CookieParserMiddleware).forRoutes(RestaurantController);
  }
}
