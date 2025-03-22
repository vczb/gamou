exports.up = function (knex) {
  return knex.schema.alterTable('orders', function (table) {
    table.text('summary').alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('orders', function (table) {
    table.string('summary').nullable().alter();
  });
};
