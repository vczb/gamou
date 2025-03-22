exports.up = function (knex) {
  return knex.schema.alterTable('orders', function (table) {
    table.string('summary').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('orders', function (table) {
    table.dropColumn('summary');
  });
};
