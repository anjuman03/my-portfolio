const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const { env } = require("../config/env");
const ApiError = require("../utils/ApiError");

/* -------------------------------------------------------------------------- */
/*                             Generate JWT                                   */
/* -------------------------------------------------------------------------- */

const generateToken = (adminId) => {
  return jwt.sign(
    { id: adminId },
    env.jwt.secret,
    {
      expiresIn: env.jwt.expiresIn,
    }
  );
};

/* -------------------------------------------------------------------------- */
/*                                Login                                       */
/* -------------------------------------------------------------------------- */

const login = async (email, password) => {
  const admin = await Admin.findOne({
    email,
  }).select("+password");

  if (!admin) {
    throw ApiError.unauthorized(
      "Invalid email or password."
    );
  }

  const isMatch =
    await admin.comparePassword(password);

  if (!isMatch) {
    throw ApiError.unauthorized(
      "Invalid email or password."
    );
  }

  if (!admin.isActive) {
    throw ApiError.forbidden(
      "Admin account is disabled."
    );
  }

  admin.lastLogin = new Date();

  await admin.save({
    validateBeforeSave: false,
  });

  const token = generateToken(admin._id);

  return {
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      avatar: admin.avatar,
    },
  };
};

/* -------------------------------------------------------------------------- */
/*                           Get Admin Profile                                */
/* -------------------------------------------------------------------------- */

const getProfile = async (id) => {
  const admin = await Admin.findById(id);

  if (!admin) {
    throw ApiError.notFound(
      "Admin not found."
    );
  }

  return admin;
};

/* -------------------------------------------------------------------------- */
/*                        Change Password                                     */
/* -------------------------------------------------------------------------- */

const changePassword = async (
  id,
  currentPassword,
  newPassword
) => {
  const admin = await Admin.findById(id).select(
    "+password"
  );

  if (!admin) {
    throw ApiError.notFound(
      "Admin not found."
    );
  }

  const isMatch =
    await admin.comparePassword(
      currentPassword
    );

  if (!isMatch) {
    throw ApiError.badRequest(
      "Current password is incorrect."
    );
  }

  admin.password = newPassword;

  await admin.save();

  return {
    message:
      "Password updated successfully.",
  };
};

module.exports = {
  login,
  getProfile,
  changePassword,
};