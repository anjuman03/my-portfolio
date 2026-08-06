const axios = require("axios");
const settingService = require("../services/setting.service");
const cloudinaryService =
require("../services/cloudinary.service");

const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");

/* -------------------------------------------------------------------------- */
/*                            Get Settings                                    */
/* -------------------------------------------------------------------------- */

const getSettings = catchAsync(async (req, res) => {
  const settings = await settingService.getSettings();

  res.json(ApiResponse.success(settings));
});

/* -------------------------------------------------------------------------- */
/*                           Update Settings                                  */
/* -------------------------------------------------------------------------- */

const updateSettings = catchAsync(async (req, res) => {
  const settings =
    await settingService.updateSettings(req.body);

  res.json(
    ApiResponse.success(
      settings,
      "Settings updated successfully."
    )
  );
});

const uploadResume =
catchAsync(async (req, res) => {
  console.log("STEP 1")
  if (!req.file) {
    throw new Error(
      "Resume PDF is required."
    );
  }

  const settings =
    await settingService.getSettings();

  if (
    settings.resume &&
    settings.resume.publicId
  ) {
    await cloudinaryService.deleteFile(
      settings.resume.publicId
    );
  }

  const resume =
    await cloudinaryService.uploadResume(
      req.file.buffer,
      req.file.originalname
    );

  const updated =
    await settingService.updateResume(
      resume
    );

  res.json(
    ApiResponse.success(
      updated,
      "Resume uploaded successfully."
    )
  );
});


const downloadResume = catchAsync(async (req, res) => {
  const settings = await settingService.getSettings();

  if (!settings.resume?.url) {
    return res.status(404).json({
      success: false,
      message: "Resume not found.",
    });
  }

  const response = await axios.get(settings.resume.url, {
    responseType: "stream",
  });

  const fileName = `${
    (settings.fullName || "Resume")
      .trim()
      .replace(/\s+/g, "_")
  }_Resume.pdf`;

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${fileName}"`
  );

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  response.data.pipe(res);
});

const uploadProfileImage = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new Error("Profile image is required.");
  }

  const settings = await settingService.getSettings();

  if (settings.profileImage?.publicId) {
    await cloudinaryService.deleteImage(
      settings.profileImage.publicId
    );
  }

  const profileImage = await cloudinaryService.uploadImage(
    req.file.buffer,
    "portfolio/profile"
  );

  const updated =
    await settingService.updateProfileImage(profileImage);

  res.json(
    ApiResponse.success(
      updated,
      "Profile image updated successfully."
    )
  );
});

module.exports = {
  getSettings,
  updateSettings,
  uploadResume,
  uploadProfileImage,
  downloadResume,
};