const { body } = require("express-validator");

const createEducationValidator = [
  body("institution")
    .trim()
    .notEmpty()
    .withMessage("Institution is required."),

  body("degree")
    .trim()
    .notEmpty()
    .withMessage("Degree is required."),

  body("fieldOfStudy")
    .trim()
    .notEmpty()
    .withMessage("Field of study is required."),

  body("startYear")
    .isInt()
    .withMessage("Invalid start year."),
];

const updateEducationValidator = [
  body("institution").optional().trim(),

  body("degree").optional().trim(),

  body("fieldOfStudy").optional().trim(),

  body("startYear")
    .optional()
    .isInt(),

  body("endYear")
    .optional()
    .isInt(),
];

module.exports = {
  createEducationValidator,
  updateEducationValidator,
};