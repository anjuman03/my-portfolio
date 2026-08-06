const skillService = require("../services/skill.service");
const cloudinaryService = require("../services/cloudinary.service");

const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");

/* -------------------------------------------------------------------------- */
/*                              Create Skill                                  */
/* -------------------------------------------------------------------------- */

const create = catchAsync(async (req, res) => {
  let icon = {
    url: "",
    publicId: "",
  };

  if (req.file) {
    icon = await cloudinaryService.uploadImage(
      req.file.buffer,
      "portfolio/skills"
    );
  }

  const skill = await skillService.createSkill({
    ...req.body,
    icon,
  });

  res.status(201).json(
    ApiResponse.success(
      skill,
      "Skill created successfully."
    )
  );
});

/* -------------------------------------------------------------------------- */
/*                              Get Skills                                    */
/* -------------------------------------------------------------------------- */

const getAll = catchAsync(async (req, res) => {
  const skills = await skillService.getSkills();

  res.json(ApiResponse.success(skills));
});

/* -------------------------------------------------------------------------- */
/*                           Get Skill By ID                                  */
/* -------------------------------------------------------------------------- */

const getById = catchAsync(async (req, res) => {
  const skill = await skillService.getSkillById(
    req.params.id
  );

  res.json(ApiResponse.success(skill));
});

/* -------------------------------------------------------------------------- */
/*                            Update Skill                                    */
/* -------------------------------------------------------------------------- */

const update = catchAsync(async (req, res) => {
  const existingSkill =
    await skillService.getSkillById(req.params.id);

  let icon = existingSkill.icon;

  if (req.file) {
    if (icon.publicId) {
      await cloudinaryService.deleteImage(
        icon.publicId
      );
    }

    icon = await cloudinaryService.uploadImage(
      req.file.buffer,
      "portfolio/skills"
    );
  }

  const skill = await skillService.updateSkill(
    req.params.id,
    {
      ...req.body,
      icon,
    }
  );

  res.json(
    ApiResponse.success(
      skill,
      "Skill updated successfully."
    )
  );
});

/* -------------------------------------------------------------------------- */
/*                            Delete Skill                                    */
/* -------------------------------------------------------------------------- */

const remove = catchAsync(async (req, res) => {
  const skill =
    await skillService.getSkillById(req.params.id);

  if (skill.icon.publicId) {
    await cloudinaryService.deleteImage(
      skill.icon.publicId
    );
  }

  await skillService.deleteSkill(req.params.id);

  res.json(
    ApiResponse.success(
      null,
      "Skill deleted successfully."
    )
  );
});

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};