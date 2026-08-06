const { body } = require("express-validator");

/* -------------------------------------------------------------------------- */
/*                           Create Skill                                     */
/* -------------------------------------------------------------------------- */

const createSkillValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Skill name is required.")
    .isLength({ max: 50 })
    .withMessage("Skill name cannot exceed 50 characters."),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required.")
    .isIn([
      "Programming",
      "Frontend",
      "Backend",
      "Database",
      "Tools",
      "Cloud",
      "Other",
    ])
    .withMessage("Invalid category."),

  body("order")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Order must be a positive number."),
];

/* -------------------------------------------------------------------------- */
/*                           Update Skill                                     */
/* -------------------------------------------------------------------------- */

const updateSkillValidator = [
  body("name")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Skill name cannot exceed 50 characters."),

  body("category")
    .optional()
    .isIn([
      "Programming",
      "Frontend",
      "Backend",
      "Database",
      "Tools",
      "Cloud",
      "Other",
    ])
    .withMessage("Invalid category."),

  body("order")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Order must be a positive number."),
];

module.exports = {
  createSkillValidator,
  updateSkillValidator,
};