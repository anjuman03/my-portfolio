const express = require("express");

const router = express.Router();

const analyticsController = require("../controllers/analytics.controller");

const adminAuth = require("../middleware/adminAuth");

/* -------------------------------------------------------------------------- */
/*                              Public Routes                                 */
/* -------------------------------------------------------------------------- */

router.post(
  "/portfolio/view",
  analyticsController.incrementPortfolioViews
);

router.post(
  "/project/view",
  analyticsController.incrementProjectViews
);

router.post(
  "/certificate/view",
  analyticsController.incrementCertificateViews
);

/* -------------------------------------------------------------------------- */
/*                             Protected Route                                */
/* -------------------------------------------------------------------------- */

router.get(
  "/",
  adminAuth,
  analyticsController.getAnalytics
);

module.exports = router;