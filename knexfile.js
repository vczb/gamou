module.exports = {
  client: "pg",
  connection: {
    host: process.env.NODE_ENV === "production" ? "gamou_db" : "localhost",
    port: 5432,
    user: "gamou_user",
    password: "secret_password",
    database: "gamou_db",
  },
  pool: { min: 2, max: 10 },
  migrations: {
    tableName: "knex_migrations",
    directory: "src/database/migrations",
  },
};
