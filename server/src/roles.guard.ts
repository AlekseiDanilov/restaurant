import {CanActivate, ExecutionContext, Injectable, ReflectMetadata} from '@nestjs/common';
import {Reflector} from "@nestjs/core";
import {RoleService} from "./role/role.service";
import {Roles} from "./role/roles";

export const ForRoles = (...roles: Roles[]) => ReflectMetadata('roles', roles);

@Injectable()
export default class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector,
              private readonly roleService: RoleService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const {user} = request;
    const accessRoles = this.reflector.get<Roles[]>('roles', context.getHandler());

    if (!accessRoles) {
      return true;
    }
    if (user) {
      const userRoles = await this.roleService.listBy({userId: user.id});
      return userRoles
        .map(r => r.role)
        .filter(r => accessRoles.indexOf(r) !== -1)
        .length > 0;
    }
    return false;
  }
}