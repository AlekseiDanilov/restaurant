import {Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import {CookieParserMiddleware} from '@nest-middlewares/cookie-parser';
import {JwtModule} from '@nestjs/jwt';
import {AuthService} from './auth.service';
import {PassportModule} from '@nestjs/passport';
import {UserModule} from 'src/user/user.module';
import {JwtStrategy} from './jwt-strategy';
import {AuthController} from './auth.controller';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 60 * 60 * 8,
      },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer {
    return consumer.apply(CookieParserMiddleware).forRoutes(AuthController);
  }
}