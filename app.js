const express = require("express");
const morgan = require("morgan");
const pool = require("./models/pool");
const routes = require("./routes/inventoryRoutes");
require("dotenv").config();

// Initiate an express app
const app = express();

// Middleware
app.use(express.static("public"));

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");

// Set routing
app.use("/", routes);

// Database setup
async function initDb() {
  try {
    await pool.query(
      "ALTER TABLE products ALTER COLUMN price TYPE NUMERIC(5, 2)"
    );
  } catch (err) {
    console.error("Error updating DB schema:", err);
  }
}

// Listening to the server
const PORT = process.env.PORT || 3000;

initDb().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`The server is running at http://localhost:${PORT}`);
  });
});
