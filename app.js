const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/inventoryRoutes");

// Initiate an express app
const app = express();

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Set view engine
app.set("view engine", "ejs");

// Set routing
app.use("/", routes);

// Listening to the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
});
