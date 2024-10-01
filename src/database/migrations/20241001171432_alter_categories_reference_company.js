exports.up = function (knex) {
  return knex.schema.alterTable("categories", function (table) {
    // Drop the user_id column
    table.dropColumn("user_id");

    // Add the company_id column and reference the companies table
    table
      .integer("company_id")
      .unsigned()
      .references("id")
      .inTable("companies")
      .onDelete("CASCADE")
      .notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("categories", function (table) {
    // Drop the company_id column
    table.dropColumn("company_id");

    // Re-add the user_id column and reference the users table
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .notNullable();
  });
};
