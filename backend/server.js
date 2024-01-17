const express = require("express");
const cors = require("cors");
const router = require("./task");
const UserRouter = require("./user");
const mongoose = require("mongoose");
require("dotenv").config();

const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.port || 3000;

const mongoURL = process.env.MONGO_URL;

app.use(bodyParser.json());
app.use(cors());
app.use(router);
app.use(UserRouter);

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({ error: err.message });
});

mongoose.connect(mongoURL);
const connection = mongoose.connection;

connection.once("connected", () =>
  console.log("connected to mongodb successfully")
);

connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

app.listen(PORT, () =>
  console.log(
    "running on port 3000",
    process.env.JWT_SECRET_KEY,
    process.env.MONGO_URL
  )
);
