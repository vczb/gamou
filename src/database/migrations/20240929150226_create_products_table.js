exports.up = function (knex) {
  return knex.schema.createTable("products", function (table) {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("description").nullable();
    table.string("image").nullable();
    table.boolean("active").defaultTo(true);
    table.decimal("price", 10, 2).notNullable();
    table.integer("amount").defaultTo(0);
    table.integer("category_id").unsigned().references("id");
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("products");
};
