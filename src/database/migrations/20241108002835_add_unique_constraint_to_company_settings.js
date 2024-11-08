exports.up = function (knex) {
  return knex.schema.alterTable("company_settings", (table) => {
    table.unique("company_id"); // Adds unique constraint to company_id
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("company_settings", (table) => {
    table.dropUnique("company_id"); // Removes the unique constraint in case of rollback
  });
};
