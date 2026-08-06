const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const { env } = require("../config/env");

const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

const adminAuth = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw ApiError.unauthorized(
      "Please login first."
    );
  }

  const decoded = jwt.verify(
    token,
    env.jwt.secret
  );

  const admin = await Admin.findById(
    decoded.id
  );

  if (!admin) {
    throw ApiError.unauthorized(
      "Admin not found."
    );
  }

  if (!admin.isActive) {
    throw ApiError.forbidden(
      "Admin account is disabled."
    );
  }

  req.admin = admin;

  next();
});

module.exports = adminAuth;