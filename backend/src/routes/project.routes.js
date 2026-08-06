const express = require("express");

const router = express.Router();

const projectController = require("../controllers/project.controller");

const adminAuth = require("../middleware/adminAuth");
const uploadImage = require("../middleware/uploadImage");
const validateRequest = require("../middleware/validateRequest");

const {
  createProjectValidator,
  updateProjectValidator,
} = require("../validators/project.validator");

/* -------------------------------------------------------------------------- */
/*                               Public Routes                                */
/* -------------------------------------------------------------------------- */

router.get(
  "/",
  projectController.getProjects
);

router.get(
  "/admin",
  adminAuth,
  projectController.getAdminProjects
);

router.get(
  "/:id",
  projectController.getProject
);

/* -------------------------------------------------------------------------- */
/*                              Protected Routes                              */
/* -------------------------------------------------------------------------- */

router.post(
  "/",
  adminAuth,
  uploadImage.single("coverImage"),
  validateRequest(createProjectValidator),
  projectController.createProject
);

router.patch(
  "/:id",
  adminAuth,
  uploadImage.single("coverImage"),
  validateRequest(updateProjectValidator),
  projectController.updateProject
);

router.delete(
  "/:id",
  adminAuth,
  projectController.deleteProject
);


module.exports = router;