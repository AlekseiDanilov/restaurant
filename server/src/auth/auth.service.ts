import {JwtService} from '@nestjs/jwt';
import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {Credentials} from '../dto/credentials';
import {CryptoHelper} from '../helper/cryptoHelper';
import {RoleService} from "../role/role.service";
import {User} from "../user/user";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
              private readonly roleService: RoleService,
              private readonly jwtService: JwtService) {}

  async login(credentials: Credentials): Promise<string> {
    const {username} = credentials;
    const user = await this.userService.findBy({username});
    if (!user) {
      throw new NotFoundException(`User ${username} not-found`)
    }
    if (!CryptoHelper.equalSha1(user.passwordHash, credentials.password)) {
      throw new UnauthorizedException("Wrong password");
    }
    const {passwordHash, ...userWithoutPassword} = user;
    const roles = await this.roleService.listBy({userId: user.id});
    return this.jwtService.sign({user: userWithoutPassword, roles: roles.map(r => r.role)});
  }

  async validateUser({user}): Promise<User> {
    return await this.userService.findById(user.id);
  }
}
