const express = require("express");
const bodyParser = require("body-parser");
const api = require("./routes/api");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const PORT = 3000;
const log = console.log;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", api);

app.get("/", (req, res) => {
  res.send("Hello from Server");
});

mongoose
  .connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on ${PORT}`));
  })
  .catch((error) => console.log(error));
