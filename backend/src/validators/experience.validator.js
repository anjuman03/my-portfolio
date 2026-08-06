const { body } = require("express-validator");

const createExperienceValidator = [
  body("organization")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Organization cannot exceed 100 characters."),

  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required."),

  body("startDate")
    .notEmpty()
    .withMessage("Start date is required.")
    .isISO8601()
    .withMessage("Invalid start date."),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required."),
];

const updateExperienceValidator = [
  body("organization").optional().trim(),

  body("role").optional().trim(),

  body("startDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid start date."),

  body("endDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Invalid end date."),

  body("description")
    .optional()
    .trim(),
];

module.exports = {
  createExperienceValidator,
  updateExperienceValidator,
};