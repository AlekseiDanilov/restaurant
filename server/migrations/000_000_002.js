exports.up = async function(knex, Promise) {
  await knex.schema.withSchema()
    .createTable('role', function(t) {
      t.string('id', 32).primary();
      t.string('userId', 32).notNullable().references('id').inTable('user');
      t.string('role', 100).notNullable();
    });
  await knex.raw("INSERT INTO \"role\" VALUES ('0', '0', 'Admin')");
};

exports.down = function(knex, Promise) {
  return knex.schema.dropSchema('role');
};
