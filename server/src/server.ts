import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import app from "./app.js";
import dbConfig from "./utility/dbConfig.js";

const port = process.env.PORT || 9000;

(async function () {
  try {
    const connect = await dbConfig();

    if (!connect) {
      throw new Error("Mongo_URI env not set");
    }

    if (connect.connection.host) {
      console.log(connect.connection.host, "connected successfully");

      app.listen(port, () => {
        console.log("Server is running on port:", port);
      });
    }
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : String(error);

    console.log("Something went wrong with DB", errMessage);

    process.exit(1);
  }
})();
