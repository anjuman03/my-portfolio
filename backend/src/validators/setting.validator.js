const { body } = require("express-validator");

const updateSettingValidator = [
  body("portfolioName").optional().trim(),

  body("fullName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Full name cannot be empty."),

  body("headline").optional().trim(),

  body("about").optional().trim(),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address."),

  body("github")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Invalid GitHub URL."),

  body("linkedin")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Invalid LinkedIn URL."),

  body("leetcode")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Invalid LeetCode URL."),

  body("hackerrank")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Invalid HackerRank URL."),

  body("codechef")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Invalid CodeChef URL."),

  body("codeforces")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Invalid Codeforces URL."),

  body("resumeUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Invalid Resume URL."),

    body("role").optional().trim(),

body("phone").optional().trim(),

body("location").optional().trim(),

body("instagram")
  .optional({ checkFalsy: true })
  .isURL()
  .withMessage("Invalid Instagram URL."),

body("twitter")
  .optional({ checkFalsy: true })
  .isURL()
  .withMessage("Invalid Twitter URL."),
];

module.exports = {
  updateSettingValidator,
};