import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {RoleService} from "./role/role.service";
import {Roles} from "./role/roles";

@Injectable()
export default class RolesGuard implements CanActivate {

  constructor(private readonly roleService: RoleService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const {user} = request;
    if (user) {
      const userRoles = await this.roleService.listBy({userId: user.id});
      return userRoles
        .map(r => r.role)
        //TODO: refactor for list roles
        .filter(r => [Roles.Admin].indexOf(r) !== -1)
        .length > 0;
    }
    return false;
  }
}