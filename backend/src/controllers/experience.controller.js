const createBaseController = require("./base.controller");

const experienceService = require("../services/experience.service");

const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");

const baseController = createBaseController(
  experienceService,
  "Experience"
);

/* -------------------------------------------------------------------------- */
/*                           Create Experience                                */
/* -------------------------------------------------------------------------- */

const create = catchAsync(async (req, res) => {
  const experience = await experienceService.create(req.body);

  res.status(201).json(
    ApiResponse.success(
      experience,
      "Experience created successfully."
    )
  );
});

/* -------------------------------------------------------------------------- */
/*                           Update Experience                                */
/* -------------------------------------------------------------------------- */

const update = catchAsync(async (req, res) => {
  const experience = await experienceService.update(
    req.params.id,
    req.body
  );

  res.json(
    ApiResponse.success(
      experience,
      "Experience updated successfully."
    )
  );
});

/* -------------------------------------------------------------------------- */
/*                      Get Featured Experiences                              */
/* -------------------------------------------------------------------------- */

const getFeaturedExperiences = catchAsync(
  async (req, res) => {
    const experiences =
      await experienceService.getFeaturedExperiences();

    res.json(
      ApiResponse.success(experiences)
    );
  }
);

/* -------------------------------------------------------------------------- */
/*                         Toggle Featured                                    */
/* -------------------------------------------------------------------------- */

const toggleFeatured = catchAsync(
  async (req, res) => {
    const experience =
      await experienceService.toggleFeatured(
        req.params.id
      );

    res.json(
      ApiResponse.success(
        experience,
        "Featured status updated."
      )
    );
  }
);

module.exports = {
  ...baseController,
  create,
  update,
  getFeaturedExperiences,
  toggleFeatured,
};