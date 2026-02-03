import mongoose from "mongoose";

async function dbConfig() {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("Mongo_URI env not set");
    }

    const dbConnection = await mongoose.connect(mongoURI);

    return dbConnection;
  } catch (error) {
    console.log(error);
  }
}

export default dbConfig;
