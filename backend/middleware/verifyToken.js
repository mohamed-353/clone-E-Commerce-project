const jwt = require("jsonwebtoken");
const asyncWrapper = require("./asyncWrapper");
const appError = require("../error/appError");
const httpStatusText = require("../utils/httpStatusText");

const verifyToken = asyncWrapper(async (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  const token = req?.cookies?.token || (authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

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
