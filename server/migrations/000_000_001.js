exports.up = async function(knex, Promise) {
  await knex.schema.withSchema()
    .createTable('user', function(t) {
      t.string('id', 32).primary();
      t.string('name', 100);
      t.string('email', 100);
      t.string('username', 100).notNullable();
      t.text('passwordHash').notNullable();
    });
  await knex.raw("INSERT INTO \"user\" VALUES ('0', 'Admin', 'admin@lol.net', 'admin', md5('qwer1234'))");
};

exports.down = function(knex, Promise) {
  return knex.schema.dropSchema('user');
};

exports.config = { transaction: false };
