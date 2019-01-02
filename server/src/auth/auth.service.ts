import {JwtService} from '@nestjs/jwt';
import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {Credentials} from '../dto/credentials';
import {CryptoHelper} from '../helper/cryptoHelper';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
              private readonly jwtService: JwtService) {}

  async login(credentials: Credentials): Promise<string> {
    const {username} = credentials;
    const user = await this.userService.findBy({username});
    if (!user) {
      throw new NotFoundException(`User ${username} not-found`)
    }
    if (!CryptoHelper.equalMd5(user.passwordHash, credentials.password)) {
      throw new UnauthorizedException("Wrong password");
    }
    const {passwordHash, ...userWithoutPassword} = user;
    return this.jwtService.sign(userWithoutPassword);
  }

  async validateUser(user): Promise<boolean> {
    return !!await this.userService.findById(user.id);
  }
}
