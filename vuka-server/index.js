const express = require("express");
const cors = require("cors");
const config = require("./config.json");
const app = express();
const loadRoutes = require("./handlers/route-handler");
const database = require("./database/sql-database");

const PORT = config.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Load routes
console.log("-----------------------------------------");
loadRoutes(app, "../routes");

app.listen(PORT, async () => {
  console.log("-----------------------------------------");

  try {
    await database.getConnection();
    console.log(`> Connected to the database successfully!`);
  } catch (error) {
    console.error(`> Failed to connect to the database: ${error.message}`);
  }

  console.log(`> Server is running on port ${PORT}`);
  console.log("-----------------------------------------");
});
