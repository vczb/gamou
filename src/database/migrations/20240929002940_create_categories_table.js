exports.up = function (knex) {
  return knex.schema.createTable("categories", function (table) {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("description").nullable();
    table.string("image").nullable();
    table.boolean("active").defaultTo(true);
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
  return knex.schema.dropTable("categories");
};
