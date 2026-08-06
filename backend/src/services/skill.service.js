const Skill = require("../models/Skill");
const ApiError = require("../utils/ApiError");

/* -------------------------------------------------------------------------- */
/*                              Create Skill                                  */
/* -------------------------------------------------------------------------- */

const createSkill = async (data) => {
  return await Skill.create(data);
};

/* -------------------------------------------------------------------------- */
/*                              Get Skills                                    */
/* -------------------------------------------------------------------------- */

const getSkills = async () => {
  return await Skill.find().sort({
    category: 1,
    order: 1,
    name: 1,
  });
};

/* -------------------------------------------------------------------------- */
/*                           Get Skill By ID                                  */
/* -------------------------------------------------------------------------- */

const getSkillById = async (id) => {
  const skill = await Skill.findById(id);

  if (!skill) {
    throw ApiError.notFound("Skill not found.");
  }

  return skill;
};

/* -------------------------------------------------------------------------- */
/*                            Update Skill                                    */
/* -------------------------------------------------------------------------- */

const updateSkill = async (id, data) => {
  const skill = await Skill.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!skill) {
    throw ApiError.notFound("Skill not found.");
  }

  return skill;
};

/* -------------------------------------------------------------------------- */
/*                            Delete Skill                                    */
/* -------------------------------------------------------------------------- */

const deleteSkill = async (id) => {
  const skill = await Skill.findByIdAndDelete(id);

  if (!skill) {
    throw ApiError.notFound("Skill not found.");
  }

  return skill;
};

module.exports = {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};