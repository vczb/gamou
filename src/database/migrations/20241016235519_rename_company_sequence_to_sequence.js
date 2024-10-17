exports.up = async function (knex) {
  // Step 1: Rename the company_sequence column to sequence
  await knex.schema.table("companies", function (table) {
    table.renameColumn("company_sequence", "sequence");
  });

  // Step 2: Update the trigger function to reference the renamed sequence column
  await knex.raw(`
    CREATE OR REPLACE FUNCTION increment_per_user() RETURNS TRIGGER AS $$
    BEGIN
      NEW.sequence := COALESCE(
        (SELECT MAX(sequence) FROM companies WHERE user_id = NEW.user_id), 0) + 1;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  // Step 3: Update the trigger to reference the updated function (if needed)
  await knex.raw(`
    DROP TRIGGER IF EXISTS increment_company_sequence ON companies;
    CREATE TRIGGER increment_company_sequence
    BEFORE INSERT ON companies
    FOR EACH ROW
    EXECUTE FUNCTION increment_per_user();
  `);
};

exports.down = async function (knex) {
  // Step 1: Revert the trigger function to use company_sequence
  await knex.raw(`
    CREATE OR REPLACE FUNCTION increment_per_user() RETURNS TRIGGER AS $$
    BEGIN
      NEW.company_sequence := COALESCE(
        (SELECT MAX(company_sequence) FROM companies WHERE user_id = NEW.user_id), 0) + 1;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  // Step 2: Recreate the trigger to reference the original function (if needed)
  await knex.raw(`
    DROP TRIGGER IF EXISTS increment_company_sequence ON companies;
    CREATE TRIGGER increment_company_sequence
    BEFORE INSERT ON companies
    FOR EACH ROW
    EXECUTE FUNCTION increment_per_user();
  `);

  // Step 3: Rename the sequence column back to company_sequence
  await knex.schema.table("companies", function (table) {
    table.renameColumn("sequence", "company_sequence");
  });
};
