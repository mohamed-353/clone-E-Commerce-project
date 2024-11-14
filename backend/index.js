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

// CORS configuration to allow specific origins
app.use(cors({
  origin: ["http://localhost:3000", "https://clone-e-commerce-project.vercel.app"],
  credentials: true,
}));

// Optionally handle OPTIONS preflight requests globally
app.options("*", cors({
  origin: ["http://localhost:3000", "https://clone-e-commerce-project.vercel.app"],
  credentials: true,
}));

// Use routes
app.use("/api", router);

app.use("/home", (req, res) => {
  res.status(200).send("Welcome to the home page");
});

connectDb().then(() => {
  console.log("connected to DB");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

// Global middleware for not found routes
app.all("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    message: "this resource is not available",
  });
});

// Global error handler
app.use((error, req, res, next) => {
  return res.json({
    success: false,
    status: error.statusText || httpStatusText.ERROR,
    message: error.message || error,
    code: error.statusCode || 500,
  });
});
