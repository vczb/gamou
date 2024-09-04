module.exports = {
  client: "pg",
  connection: {
    host: "gamou_db",
    port: 5432,
    user: "gamou_user",
    password: "secret_password",
    database: "gamou_db",
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "src/database/migrations",
  },
};
