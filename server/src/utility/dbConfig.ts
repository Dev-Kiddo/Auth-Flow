const mongoose = require("mongoose");

async function dbConfig() {
  const dbConnection = await mongoose.connect(process.env.MONGO_URI);
  return dbConnection;
}

module.exports = dbConfig;
