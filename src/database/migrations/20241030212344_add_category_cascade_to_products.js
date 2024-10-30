exports.up = function (knex) {
  return knex.schema.alterTable("products", function (table) {
    // Add foreign key constraint with cascade on delete
    table
      .foreign("category_id")
      .references("id")
      .inTable("categories")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("products", function (table) {
    // Drop the foreign key constraint in the rollback
    table.dropForeign("category_id");
  });
};
