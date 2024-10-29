exports.up = function (knex) {
  return knex.schema.createTable("variant_options", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable(); // Option name, e.g., "Red"
    table
      .integer("variant_id")
      .unsigned()
      .references("id")
      .inTable("product_variants")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("variant_options");
};
