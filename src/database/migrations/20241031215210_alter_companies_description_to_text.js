exports.up = function (knex) {
  return knex.schema.alterTable("companies", function (table) {
    table.text("description").alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("companies", function (table) {
    table.string("description").alter();
  });
};
