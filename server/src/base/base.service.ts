import {Db} from "../db/db";
import Identifiable from "./identifiable";
import {Injectable} from "@nestjs/common";

@Injectable()
export class BaseService<Entity extends Identifiable<string>> {
  constructor(readonly db: Db) {
  }

  tableName(): string {
    throw Error("override this method");
  }

  async create(entity: Entity): Promise<Entity> {
    return this.db.tx(trx => this.db
      .table(this.tableName())
      .insert(entity)
      .returning('*')
      .transacting(trx)
      .then(res => res[0]),
    );
  }

  async update(entity: Entity): Promise<Entity> {
    return this.db.tx(trx => this.db
      .table(this.tableName())
      .where('id', '=', entity.id)
      .update(entity)
      .returning('*')
      .transacting(trx)
      .then(res => res[0]),
    );
  }

  async findById(id: string): Promise<Entity> {
    return this.db.do()
    .select('*')
    .from(this.tableName())
    .where({id: id})
    .first();
  }

  async findBy(param: object): Promise<Entity> {
    return this.db.do()
    .select('*')
    .from(this.tableName())
    .where(param)
    .first();
  }

  async list(): Promise<Array<Entity>> {
    return this.db.do()
    .select('*')
    .from(this.tableName());
  }

  async listBy(param: object): Promise<Array<Entity>> {
    return this.db.do()
    .select('*')
    .where(param)
    .from(this.tableName());
  }

  async delete(id: string): Promise<void> {
    return this.db.tx(trx => this.db
      .table(this.tableName())
      .where({id: id})
      .del()
      .transacting(trx)
    );
  }
}
