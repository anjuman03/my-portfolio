const express = require("express");

const router = express.Router();

const experienceController = require("../controllers/experience.controller");

const adminAuth = require("../middleware/adminAuth");
const validateRequest = require("../middleware/validateRequest");

const {
  createExperienceValidator,
  updateExperienceValidator,
} = require("../validators/experience.validator");

/* ----------------------------- Public Routes ----------------------------- */

router.get(
  "/",
  experienceController.getAll
);

router.get(
  "/featured",
  experienceController.getFeaturedExperiences
);

/* ---------------------------- Protected Routes --------------------------- */

router.post(
  "/",
  adminAuth,
  validateRequest(createExperienceValidator),
  experienceController.create
);

router.patch(
  "/:id",
  adminAuth,
  validateRequest(updateExperienceValidator),
  experienceController.update
);

router.delete(
  "/:id",
  adminAuth,
  experienceController.remove
);

router.patch(
  "/:id/featured",
  adminAuth,
  experienceController.toggleFeatured
);

module.exports = router;