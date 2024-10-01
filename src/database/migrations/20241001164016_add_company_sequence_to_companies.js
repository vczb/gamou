exports.up = async function (knex) {
  // Step 1: Add the new company_sequence column to the existing companies table
  await knex.schema.table("companies", function (table) {
    table.integer("company_sequence").notNullable().defaultTo(1);
  });

  // Step 2: Create the trigger function for auto-incrementing company_sequence based on user_id
  await knex.raw(`
    CREATE OR REPLACE FUNCTION increment_per_user() RETURNS TRIGGER AS $$
    BEGIN
      NEW.company_sequence := COALESCE(
        (SELECT MAX(company_sequence) FROM companies WHERE user_id = NEW.user_id), 0) + 1;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  // Step 3: Create the trigger itself
  await knex.raw(`
    CREATE TRIGGER increment_company_sequence
    BEFORE INSERT ON companies
    FOR EACH ROW
    EXECUTE FUNCTION increment_per_user();
  `);
};

exports.down = async function (knex) {
  // Remove the trigger first
  await knex.raw(
    `DROP TRIGGER IF EXISTS increment_company_sequence ON companies`
  );

  // Remove the trigger function
  await knex.raw(`DROP FUNCTION IF EXISTS increment_per_user`);

  // Drop the company_sequence column
  await knex.schema.table("companies", function (table) {
    table.dropColumn("company_sequence");
  });
};
