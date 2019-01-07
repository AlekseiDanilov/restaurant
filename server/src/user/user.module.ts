import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {UserService} from './user.service';
import {Db} from '../db/db';
import {UserController} from './user.controller';
import {CookieParserMiddleware} from "@nest-middlewares/cookie-parser";
import {RoleModule} from "../role/role.module";
import {RoleService} from "../role/role.service";

@Module({
  providers: [UserService, Db, RoleService],
  exports: [UserService],
  controllers: [UserController],
  imports: [RoleModule]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer {
    return consumer.apply(CookieParserMiddleware).forRoutes(UserController);
  }
}
