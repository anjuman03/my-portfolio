const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin.controller");
const adminAuth = require("../middleware/adminAuth");
const validateRequest = require("../middleware/validateRequest");

const {
  loginValidator,
  changePasswordValidator,
} = require("../validators/admin.validator");

// PUBLIC
router.post(
  "/login",
  validateRequest(loginValidator),
  adminController.login
);

// Everything below requires authentication
router.use(adminAuth);

router.get("/me", adminController.getProfile);

router.patch(
  "/change-password",
  validateRequest(changePasswordValidator),
  adminController.changePassword
);

router.post("/logout", adminController.logout);

module.exports = router;