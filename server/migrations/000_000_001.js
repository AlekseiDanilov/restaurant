exports.up = async function(knex, Promise) {
  await knex.schema.withSchema()
    .createTable('user', function(t) {
      t.string('id', 32).primary();
      t.string('name', 100);
      t.string('email', 100);
      t.string('username', 100).notNullable();
      t.string('passwordHash', 40).notNullable();
    });
  await knex.raw("INSERT INTO \"user\" VALUES ('0', 'Admin', 'admin@lol.net', 'admin', 'db25f2fc14cd2d2b1e7af307241f548fb03c312a')");
};

exports.down = function(knex, Promise) {
  return knex.schema.dropSchema('user');
};
