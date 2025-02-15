require("dotenv").config();
const mongoose = require("mongoose");

// Connect to First Database
const db1 = mongoose.createConnection(`${process.env.MONGO_URI}KliteSuperAdmin`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db1.on("connected", () => console.log("Connected to KliteSuperAdmin database"));
db1.on("error", (err) => console.error("Error connecting to KliteSuperAdmin database:", err));

// Connect to Second Database
const db2 = mongoose.createConnection(`${process.env.MONGO_URI}Clients`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db2.on("connected", () => console.log("Connected to Clients database"));
db2.on("error", (err) => console.error("Error connecting to Clients database:", err));

module.exports = { db1, db2 };
