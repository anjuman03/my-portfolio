const { body } = require("express-validator");

/* -------------------------------------------------------------------------- */
/*                                Admin Login                                 */
/* -------------------------------------------------------------------------- */

const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters."),
];

/* -------------------------------------------------------------------------- */
/*                           Change Password                                  */
/* -------------------------------------------------------------------------- */

const changePasswordValidator = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required."),

  body("newPassword")
    .notEmpty()
    .withMessage("New password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters."),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required.")
    .custom((value, { req }) => value === req.body.newPassword)
    .withMessage("Passwords do not match."),
];

module.exports = {
  loginValidator,
  changePasswordValidator,
};