exports.up = function (knex) {
  return knex.schema.table("users", (table) => {
    table.string("name").after("email");
  });
};

exports.down = function (knex) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("name");
  });
};
