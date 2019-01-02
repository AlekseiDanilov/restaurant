import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthService} from './auth.service';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';

const cookieJwtExtractor = request => {
  return request.cookies["restaurant-jwt"];
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieJwtExtractor]),
      secretOrKey: 'secretKey', //TODO: secretKey to config,
    });
  }

  async validate(userData) {
    const user = await this.authService.validateUser(userData);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}