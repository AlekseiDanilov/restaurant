exports.up = function(knex, Promise) {
  return knex.schema.withSchema()
    .createTable('user', function(t) {
      t.string('id', 32).primary();
      t.string('name', 100);
      t.string('email', 100);
      t.string('username', 100).notNullable();
      t.text('passwordHash').notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropSchema('user');
};
