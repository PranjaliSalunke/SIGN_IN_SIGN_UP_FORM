require("dotenv").config();
const express = require("express");
const app = express();
require("./mongo");
const indexRouter = require("./routes/index.route.");

app.use(express.json());

app.get("/", (req, res) => {
  console.log("server is connected");
  res.send("Server is running !");
});

app.use("/api", indexRouter);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});

app.use("/CH-${regex}", indexRouter);
