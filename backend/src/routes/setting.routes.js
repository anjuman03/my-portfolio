const express = require("express");

const router = express.Router();


const settingController = require("../controllers/setting.controller");

const adminAuth = require("../middleware/adminAuth");
const validateRequest = require("../middleware/validateRequest");

const uploadPdf =
require("../middleware/uploadPdf");

const uploadImage = require("../middleware/uploadImage");

const {
  updateSettingValidator,
} = require("../validators/setting.validator");

/* -------------------------------------------------------------------------- */
/*                               Public Route                                 */
/* -------------------------------------------------------------------------- */

router.get(
  "/",
  settingController.getSettings
);

/* -------------------------------------------------------------------------- */
/*                             Protected Route                                */
/* -------------------------------------------------------------------------- */

router.patch(
  "/",
  adminAuth,
  validateRequest(updateSettingValidator),
  settingController.updateSettings
);

router.patch(
  "/resume",
  adminAuth,
  uploadPdf.single("resume"),
  settingController.uploadResume
);

router.get(
  "/resume/download",
  settingController.downloadResume
);

router.patch(
  "/profile-image",
  adminAuth,
  uploadImage.single("profileImage"),
  settingController.uploadProfileImage
);

module.exports = router;