const express = require("express");

const router = express.Router();

const skillController = require("../controllers/skill.controller");

const adminAuth = require("../middleware/adminAuth");
const uploadImage = require("../middleware/uploadImage");
const validateRequest = require("../middleware/validateRequest");

const {
  createSkillValidator,
  updateSkillValidator,
} = require("../validators/skill.validator");

/* -------------------------------------------------------------------------- */
/*                              Public Routes                                 */
/* -------------------------------------------------------------------------- */

router.get("/", skillController.getAll);

router.get("/:id", skillController.getById);

/* -------------------------------------------------------------------------- */
/*                             Protected Routes                               */
/* -------------------------------------------------------------------------- */

router.post(
  "/",
  adminAuth,
  uploadImage.single("icon"),
  validateRequest(createSkillValidator),
  skillController.create
);

router.patch(
  "/:id",
  adminAuth,
  uploadImage.single("icon"),
  validateRequest(updateSkillValidator),
  skillController.update
);

router.delete(
  "/:id",
  adminAuth,
  skillController.remove
);

module.exports = router;