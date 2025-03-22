exports.up = function (knex) {
  return knex.schema
    // First create the ENUMs
    .raw(`
      CREATE TYPE order_status_enum AS ENUM (
        'pending', 
        'processing', 
        'completed', 
        'cancelled'
      );
      CREATE TYPE payment_method_enum AS ENUM (
        'credit_card', 
        'debit_card', 
        'cash', 
        'pix', 
        'other'
      );
    `)
    .then(() => {
      return knex.schema.createTable("orders", function (table) {
        table.increments("id").primary();
        table.string("customer_name").notNullable();
        table.string("customer_phone").nullable();
        table.string("customer_email").nullable();
        table.text("address").nullable();
        table.jsonb("items").notNullable(); // Using JSONB type for better performance
        table.decimal("total", 10, 2).notNullable();
        table.specificType("payment_method", "payment_method_enum").nullable();
        table.text("order_notes").nullable();
        table.text("cart_notes").nullable();
        table.specificType("status", "order_status_enum").defaultTo("pending");
        table
          .integer("company_id")
          .unsigned()
          .references("id")
          .inTable("companies")
          .onDelete("CASCADE");
        table.timestamps(true, true);
      });
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("orders")
    .then(() => {
      return knex.schema.raw(`
        DROP TYPE IF EXISTS order_status_enum;
        DROP TYPE IF EXISTS payment_method_enum;
      `);
    });
};