import {Injectable} from '@nestjs/common';
import {BaseService} from "../base/base.service";
import {Role} from "./role";

@Injectable()
export class RoleService extends BaseService<Role> {

  tableName(): string {
    return "role";
  }
}
