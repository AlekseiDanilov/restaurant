exports.up = async function (knex, Promise) {
  return knex.schema.withSchema()
    .createTable('restaurant', function (t) {
      t.string('id', 32).primary();
      t.text('name');
      t.dateTime('monFrom');
      t.dateTime('monUntil');
      t.dateTime('tueFrom');
      t.dateTime('tueUntil');
      t.dateTime('wedFrom');
      t.dateTime('wedUntil');
      t.dateTime('thuFrom');
      t.dateTime('thuUntil');
      t.dateTime('friFrom');
      t.dateTime('friUntil');
      t.dateTime('satFrom');
      t.dateTime('satUntil');
      t.dateTime('sunFrom');
      t.dateTime('sunUntil');
    });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropSchema('restaurant');
};
