import {Injectable} from '@nestjs/common';
import {User} from './user';
import {CreateUpdateUserDto} from '../dto/create-update-user-dto';
import {CryptoHelper} from '../helper/cryptoHelper';
import {BaseService} from "../base/base.service";
import {RoleService} from "../role/role.service";
import {Roles} from "../role/roles";
import {Db} from "../db/db";

@Injectable()
export class UserService extends BaseService<User> {

  constructor(private readonly roleService: RoleService,
              readonly db: Db){
    super(db)
  }

  tableName(): string {
    return "user";
  }

  async create(dto: CreateUpdateUserDto): Promise<User> {
    const draftUser: User = {
      id: CryptoHelper.randomUuid(),
      name: dto.name,
      email: dto.email,
      username: dto.username,
      passwordHash: CryptoHelper.sha1(dto.password),
    };
    const newUser = await super.create(draftUser);

    await this.roleService.create({
      id: CryptoHelper.randomUuid(),
      userId: newUser.id,
      role: Roles.Active
    });

    return newUser;
  }

  async update(dto: CreateUpdateUserDto): Promise<User> {
    const updUser: User = {
      id: dto.id,
      name: dto.name,
      email: dto.email,
      username: dto.username,
      passwordHash: dto.password ? CryptoHelper.sha1(dto.password) : undefined,
    };
    return super.update(updUser);
  }

  async delete(id: string): Promise<void> {
    const forDelete = await this.roleService.listBy({userId: id});
    forDelete.map(r => this.roleService.delete(r.id));

    super.delete(id);
  }
}
