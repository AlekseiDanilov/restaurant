import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {RoleService} from "./role/role.service";
import {Roles} from "./role/roles";

@Injectable()
export default class RolesGuard implements CanActivate {

  private readonly roleService: RoleService;

  private readonly accessRoles: Array<Roles>;

  constructor(accessRoles: Array<Roles>) {
    this.accessRoles = accessRoles;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const {user} = request;
    if (user) {
      const userRoles = await this.roleService.listBy({userId: user.id});
      return userRoles
        .map(r => r.role)
        .filter(r => this.accessRoles.indexOf(r) !== -1)
        .length > 0;
    }
    return false;
  }
}