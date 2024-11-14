const jwt = require("jsonwebtoken");
const asyncWrapper = require("./asyncWrapper");
const appError = require("../error/appError");
const httpStatusText = require("../utils/httpStatusText");

const verifyToken = asyncWrapper(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = req.cookies?.token || (authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

  console.log("Token in Cookies: ", req.cookies?.token);  // Log token in cookies
  console.log("Authorization Header: ", authHeader);  // Log Authorization header
  console.log("Extracted Token: ", token);  // Log extracted token

  if (!token) {
    const error = appError.create("Please log in to access this resource.", 401, httpStatusText.ERROR);
    return next(error);
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
    next();
  } catch (err) {
    const error = appError.create("Invalid token. Please log in again.", 401, httpStatusText.ERROR);
    return next(error);
  }
});

module.exports = verifyToken;
