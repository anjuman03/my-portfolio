const { body } = require("express-validator");

/* -------------------------------------------------------------------------- */
/*                          Create Certificate                                */
/* -------------------------------------------------------------------------- */

const createCertificateValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Certificate title is required.")
    .isLength({ max: 150 })
    .withMessage("Title cannot exceed 150 characters."),

  body("issuer")
    .trim()
    .notEmpty()
    .withMessage("Issuer is required."),

  body("issueDate")
    .notEmpty()
    .withMessage("Issue date is required.")
    .isISO8601()
    .withMessage("Invalid issue date."),

  body("expiryDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Invalid expiry date."),

  body("credentialUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Invalid credential URL."),
];

/* -------------------------------------------------------------------------- */
/*                          Update Certificate                                */
/* -------------------------------------------------------------------------- */

const updateCertificateValidator = [
  body("title")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Title cannot exceed 150 characters."),

  body("issuer")
    .optional()
    .trim(),

  body("issueDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid issue date."),

  body("expiryDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Invalid expiry date."),

  body("credentialUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Invalid credential URL."),
];

module.exports = {
  createCertificateValidator,
  updateCertificateValidator,
};