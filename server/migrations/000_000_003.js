exports.up = async function (knex, Promise) {
  return knex.schema.withSchema()
    .createTable('room', function (t) {
      t.string('id', 32).primary();
      t.text('name');
      t.integer('width');
      t.integer('height');
    });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropSchema('room');
};
