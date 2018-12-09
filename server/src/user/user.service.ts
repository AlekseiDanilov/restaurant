import { Injectable } from '@nestjs/common';
import { Db } from '../db/db';
import { User } from '../entity/user';
import { CreateUpdateUserDto } from '../dto/create-update-user-dto';
import { CryptoHelper } from '../helper/cryptoHelper';

@Injectable()
export class UserService {

  private readonly USER_TABLE = 'user';

  constructor(readonly db: Db) {
  }

  // TODO: move boilerplate to BaseService
  async create(dto: CreateUpdateUserDto): Promise<User> {
    return this.db.tx(trx => this.db
      .table(this.USER_TABLE)
      .insert({
        id: CryptoHelper.randomUuid(),
        name: dto.name,
        email: dto.email,
        username: dto.username,
        passwordHash: CryptoHelper.md5(dto.password),
      })
      .returning('*')
      .transacting(trx)
      .then(res => res[0]),
    );
  }

  async update(dto: CreateUpdateUserDto): Promise<User> {
    return this.db.tx(trx => this.db
      .table(this.USER_TABLE)
      .where('id', '=', dto.id)
      .update({
        name: dto.name,
        email: dto.email,
        username: dto.username,
        passwordHash: dto.password ? CryptoHelper.md5(dto.password) : undefined,
      })
      .returning('*')
      .transacting(trx)
      .then(res => res[0]),
    );
  }

  async find(id: string): Promise<User> {
    return this.db.do()
      .select('*')
      .from(this.USER_TABLE)
      .where({ id: id })
      .first();
  }

  async list(): Promise<Array<User>> {
    return this.db.do()
      .select('*')
      .from(this.USER_TABLE)
  }

  async delete(id: string): Promise<void> {
    this.db.tx(trx => this.db
      .table(this.USER_TABLE)
      .where({ id: id })
      .del()
      .transacting(trx),
    );
  }
}
