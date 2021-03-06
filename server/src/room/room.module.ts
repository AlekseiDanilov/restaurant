import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {RoomService} from './room.service';
import {RoomController} from './room.controller';
import {Db} from "../db/db";
import {CookieParserMiddleware} from "@nest-middlewares/cookie-parser";
import {FurnitureService} from "./furniture.service";

@Module({
  providers: [RoomService, FurnitureService, Db],
  controllers: [RoomController]
})
export class RoomModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer {
    return consumer.apply(CookieParserMiddleware).forRoutes(RoomController);
  }
}