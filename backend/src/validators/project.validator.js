const { body } = require("express-validator");

/* -------------------------------------------------------------------------- */
/*                           Create Project                                   */
/* -------------------------------------------------------------------------- */

const createProjectValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Project title is required.")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters."),

  body("shortDescription")
    .trim()
    .notEmpty()
    .withMessage("Short description is required.")
    .isLength({ max: 250 })
    .withMessage("Short description cannot exceed 250 characters."),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required."),

  body("category")
    .optional()
    .isIn([
      "Full Stack",
      "Frontend",
      "Backend",
      "AI/ML",
      "Mobile",
      "Other",
    ])
    .withMessage("Invalid project category."),

  body("githubUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Invalid GitHub URL."),

  body("liveUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Invalid Live URL."),

  body("technologies")
    .optional()
    .customSanitizer((value) => {
      if (Array.isArray(value)) return value;
      if (typeof value === "string") {
        return value
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean);
      }
      return [];
    }),
];

/* -------------------------------------------------------------------------- */
/*                           Update Project                                   */
/* -------------------------------------------------------------------------- */

const updateProjectValidator = [
  body("title")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters."),

  body("shortDescription")
    .optional()
    .trim()
    .isLength({ max: 250 })
    .withMessage("Short description cannot exceed 250 characters."),

  body("githubUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Invalid GitHub URL."),

  body("liveUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Invalid Live URL."),

  body("technologies")
    .optional()
    .customSanitizer((value) => {
      if (Array.isArray(value)) return value;
      if (typeof value === "string") {
        return value
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean);
      }
      return [];
    }),
];

module.exports = {
  createProjectValidator,
  updateProjectValidator,
};