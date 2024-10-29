// 2024102901_create_product_variants_table.js

exports.up = function (knex) {
  return knex.schema.createTable("product_variants", function (table) {
    table.increments("id").primary();
    table.string("title").notNullable(); // Title of the variant, e.g., "Color"
    table.boolean("isRequired").defaultTo(false);
    table.boolean("isMultiple").defaultTo(false);
    table
      .integer("product_id")
      .unsigned()
      .references("id")
      .inTable("products")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("product_variants");
};
