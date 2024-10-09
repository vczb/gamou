exports.up = function (knex) {
  return knex.schema.table("companies", function (table) {
    table.string("phone").nullable(); // Add the phone column
  });
};

exports.down = function (knex) {
  return knex.schema.table("companies", function (table) {
    table.dropColumn("phone"); // Drop the phone column on rollback
  });
};
