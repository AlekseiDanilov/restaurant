import {Injectable} from '@nestjs/common';
import Promise from 'bluebird';
import * as Knex from 'knex';

@Injectable()
export class Db {

  private readonly knex: Knex;

  constructor() {
    //TODO: settings to config file
    this.knex = Knex({
      client: 'pg',
      connection: {
        host: 'localhost',
        port: '5432',
        user: 'postgres',
        password: 'postgres',
        database: 'restaurant'
      },
      migrations: {
        tableName: 'migrations',
      }
    });

    this.knex.migrate.latest();
  }

  tx<T>(foo: (trx: Knex.Transaction) => Promise<T>): Promise<T> {
    return this.knex.transaction(trx => {
        return foo(trx).then(trx.commit).catch(trx.rollback);
      }
    )
  }

  table(tableName: string): Knex.QueryBuilder {
    return this.knex(tableName);
  }

  do(): Knex {
    return this.knex;
  }
}
