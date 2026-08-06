const Education = require("../models/Education");
const createBaseService = require("./base.service");

const baseService = createBaseService(Education);

const getFeaturedEducation = async () => {
  return await Education.find({
    featured: true,
  }).sort({
    order: 1,
    startYear: -1,
  });
};

const toggleFeatured = async (id) => {
  const education = await baseService.getById(id);

  education.featured = !education.featured;

  await education.save();

  return education;
};

module.exports = {
  ...baseService,
  getFeaturedEducation,
  toggleFeatured,
};