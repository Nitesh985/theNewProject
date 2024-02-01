import app from "./app.js";
import "dotenv/config.js";
import { connectToDB } from "./db/index.js";

connectToDB()
.then(() => {
    app.get("/", (req, res) => {
      res.send("Welcome to the e-commerce website");
    });
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`The app is listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Connection to Mongodb failed ::", error);
  });
