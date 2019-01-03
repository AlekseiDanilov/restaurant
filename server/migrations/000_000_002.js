
exports.up = function(knex, Promise) {
  return knex.raw("INSERT INTO \"user\" VALUES ('0', 'Admin', 'admin@lol.net', 'admin', md5('qwer1234'))");
};

exports.down = function(knex, Promise) {
  return knex('user').where({id: "0"}).del();
};
