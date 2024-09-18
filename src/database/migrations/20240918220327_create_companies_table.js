exports.up = function (knex) {
  return knex.schema.createTable("companies", function (table) {
    table.increments("id").primary();
    table.string("description");
    table.string("image");
    table.string("slug").unique();
    table.string("name").notNullable();
    table.boolean("active").defaultTo(true);
    table.string("currency", 3).defaultTo("BRL"); // BRL, USD, EUR
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
  return knex.schema.dropTable("companies");
};
