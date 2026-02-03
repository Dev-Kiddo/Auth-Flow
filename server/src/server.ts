const dotenv = require("dotenv").config({ path: "./config.env" });
const app = require("./app");
const dbConfig = require("./utility/dbConfig");

app.use("/api/v1", (request, response) => {
  response.send("Hello Nodejs");
});

const port = process.env.PORT || 9000;

(async function () {
  try {
    const connect = await dbConfig();
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
