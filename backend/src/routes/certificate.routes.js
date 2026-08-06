const express = require("express");

const router = express.Router();

const certificateController = require("../controllers/certificate.controller");

const adminAuth = require("../middleware/adminAuth");
const uploadImage = require("../middleware/uploadImage");
const validateRequest = require("../middleware/validateRequest");

const {
  createCertificateValidator,
  updateCertificateValidator,
} = require("../validators/certificate.validator");

/* -------------------------------------------------------------------------- */
/*                              Public Routes                                 */
/* -------------------------------------------------------------------------- */

router.get(
  "/",
  certificateController.getCertificates
);

router.get(
  "/featured",
  certificateController.getFeaturedCertificates
);

router.get(
  "/:id",
  certificateController.getCertificate
);

/* -------------------------------------------------------------------------- */
/*                             Protected Routes                               */
/* -------------------------------------------------------------------------- */

router.get(
  "/admin",
  adminAuth,
  certificateController.getAdminCertificates
);

router.post(
  "/",
  adminAuth,
  uploadImage.single("image"),
  validateRequest(createCertificateValidator),
  certificateController.createCertificate
);

router.patch(
  "/:id",
  adminAuth,
  uploadImage.single("image"),
  validateRequest(updateCertificateValidator),
  certificateController.updateCertificate
);

router.delete(
  "/:id",
  adminAuth,
  certificateController.deleteCertificate
);

router.patch(
  "/:id/featured",
  adminAuth,
  certificateController.toggleFeatured
);

router.patch(
  "/:id/published",
  adminAuth,
  certificateController.togglePublished
);

module.exports = router;