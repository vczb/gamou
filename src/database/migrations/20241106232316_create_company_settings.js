exports.up = function (knex) {
  return knex.schema.createTable("company_settings", function (table) {
    table.increments("id").primary();
    table
      .integer("company_id")
      .unsigned()
      .references("id")
      .inTable("companies")
      .onDelete("CASCADE")
      .notNullable();
    table.boolean("products_has_variants").defaultTo(false); // Indicates if products have variants
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("company_settings");
};
