const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

const auth = require("../middleware/auth");
const validateRequest = require("../middleware/validateRequest");

const {
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
  updateProfileValidator,
} = require("../validators/auth.validator");

/* -------------------------------------------------------------------------- */
/*                               Public Routes                                */
/* -------------------------------------------------------------------------- */

router.post(
  "/login",
  validateRequest(loginValidator),
  authController.login
);

router.post(
  "/forgot-password",
  validateRequest(forgotPasswordValidator),
  authController.forgotPassword
);

router.post(
  "/reset-password/:token",
  validateRequest(resetPasswordValidator),
  authController.resetPassword
);

/* -------------------------------------------------------------------------- */
/*                              Protected Routes                              */
/* -------------------------------------------------------------------------- */

router.use(auth);

router.get(
  "/me",
  authController.getProfile
);

router.patch(
  "/profile",
  validateRequest(updateProfileValidator),
  authController.updateProfile
);

router.patch(
  "/change-password",
  validateRequest(changePasswordValidator),
  authController.changePassword
);

router.post(
  "/logout",
  authController.logout
);

module.exports = router;