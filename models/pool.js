const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: "ksenya",
  database: "plants_inventory",
  password: "ksenyaU5614",
  port: 5432,
});
