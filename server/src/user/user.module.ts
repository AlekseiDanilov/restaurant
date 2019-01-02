import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {UserService} from './user.service';
import {Db} from '../db/db';
import {UserController} from './user.controller';
import {CookieParserMiddleware} from "@nest-middlewares/cookie-parser";

@Module({
  providers: [UserService, Db],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer {
    return consumer.apply(CookieParserMiddleware).forRoutes(UserController);
  }
}
