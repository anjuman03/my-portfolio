const createBaseController = require("./base.controller");

const educationService = require("../services/education.service");

const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");

const baseController =
  createBaseController(
    educationService,
    "Education"
  );

const getFeaturedEducation =
  catchAsync(async (req, res) => {
    const education =
      await educationService.getFeaturedEducation();

    res.json(
      ApiResponse.success(education)
    );
  });

const toggleFeatured =
  catchAsync(async (req, res) => {
    const education =
      await educationService.toggleFeatured(
        req.params.id
      );

    res.json(
      ApiResponse.success(
        education,
        "Featured status updated."
      )
    );
  });

module.exports = {
  ...baseController,
  getFeaturedEducation,
  toggleFeatured,
};