const jwt = require("jsonwebtoken");
const asyncWrapper = require("./asyncWrapper");
const appError = require("../error/appError");
const httpStatusText = require("../utils/httpStatusText");

const verifyToken = asyncWrapper(async (req, res, next) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtZWQzNTNAZ21haWwuY29tIiwiX2lkIjoiNjczNjA0ZmYzNmQ1ZTY0OWE2YWJjMTkwIiwicm9sZSI6Ik1BTkFHRVIiLCJpYXQiOjE3MzE2MTI0MzgsImV4cCI6MTczMjIxNzIzOH0.kGsBw0ba_qha9Z1ZEO3I7U517N_WoS3ZYTPdVZZ3Iwc"

  if (!token) {
    const error = appError.create(`Please log in to access this resource.${token}`, 401, httpStatusText.ERROR);
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
