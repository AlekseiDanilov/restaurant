exports.up = async function (knex, Promise) {
  return knex.schema.withSchema()
    .createTable('furniture', function (t) {
      t.string('id', 32).primary();
      t.string('roomId', 32).notNullable().references('id').inTable('room');
      t.string('kind', 100).notNullable();
      t.float('x');
      t.float('y');
      t.integer('numberSeats');
    });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropSchema('furniture');
};
