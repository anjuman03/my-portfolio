const Experience = require("../models/Experience");
const createBaseService = require("./base.service");

const baseService = createBaseService(Experience);

const getFeaturedExperiences = async () => {
  return await Experience.find({
    featured: true,
  }).sort({
    order: 1,
    startDate: -1,
  });
};

const toggleFeatured = async (id) => {
  const experience = await baseService.getById(id);

  experience.featured = !experience.featured;

  await experience.save();

  return experience;
};

module.exports = {
  ...baseService,
  getFeaturedExperiences,
  toggleFeatured,
};