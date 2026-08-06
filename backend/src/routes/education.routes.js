const express = require("express");

const router = express.Router();

const educationController = require("../controllers/education.controller");

const adminAuth = require("../middleware/adminAuth");

const validateRequest = require("../middleware/validateRequest");

const {
  createEducationValidator,
  updateEducationValidator,
} = require("../validators/education.validator");

/* ---------------- Public ---------------- */

router.get("/", educationController.getAll);

router.get(
  "/featured",
  educationController.getFeaturedEducation
);

/* --------------- Protected -------------- */

router.post(
  "/",
  adminAuth,
  validateRequest(createEducationValidator),
  educationController.create
);

router.patch(
  "/:id",
  adminAuth,
  validateRequest(updateEducationValidator),
  educationController.update
);

router.delete(
  "/:id",
  adminAuth,
  educationController.remove
);

router.patch(
  "/:id/featured",
  adminAuth,
  educationController.toggleFeatured
);

module.exports = router;