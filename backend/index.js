const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/db");
const router = require("./routes/router");
const httpStatusText = require("./utils/httpStatusText");

const app = express();
app.use(express.json({ limit: '6mb' }));
app.use(cookieParser());

app.use("/api", cors({
  origin: process.env.FRONTEND_URL || "https://clone-e-commerce-project-frontend.vercel.app",
  methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
  credentials: true,
}));

app.use("/api", router);

app.get("/home", (req, res) => {
  res.status(200).send("hello");
});

connectDb().then(() => {
  console.log("connect to DB");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

// global middleware for not found router

app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: "error",
    message: "this resource is not available",
  });
});

// global error handler
app.use((error, req, res, next) => {
  return res.json({
    success: false,
    status: error.statusText || httpStatusText.ERROR,
    message: error.message || error,
    code: error.statusCode || 500,
  });
});