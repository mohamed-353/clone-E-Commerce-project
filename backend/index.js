const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/db");
const router = require("./routes/router");
const httpStatusText = require("./utils/httpStatusText");
const productModel = require("./models/productModel");


const app = express();
app.use(express.json({ limit: '6mb' })); // Increase as needed
app.use(cookieParser());

app.use(cors({
  origin: "https://clone-e-commerce-project-frontend.vercel.app/",
  methods: ["POST", "GET", "DELETE"],
  credentials: true,
}));

app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200).send("hello");
});

app.get("/home", (req, res) => {
  res.status(200).send("Welcome to the home page");
});

router.get("/productCategory", async (req, res) => {
  try {
    const products = await productModel.find();  // Make sure this is querying the correct collection
    if (products.length > 0) {
      res.status(200).json({ success: true, data: products });
    } else {
      res.status(200).json({ success: true, data: [], message: "No products found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});


connectDb().then(() => {
  console.log("connect to DB");
});

const PORT = process.env.PORT || 4000;

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