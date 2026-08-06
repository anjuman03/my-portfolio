const Setting = require("../models/Setting");

const getSettings = async () => {
  let settings = await Setting.findOne();

  if (!settings) {
    settings = await Setting.create({
      fullName: "",
    });
  }

  return settings;
};

const updateProfileImage = async (profileImage) => {
  let settings = await Setting.findOne();

  if (!settings) {
    settings = await Setting.create({
      fullName: "",
    });
  }

  settings.profileImage = profileImage;

  await settings.save();

  return settings;
};

const updateSettings = async (data) => {
  let settings = await Setting.findOne();

  if (!settings) {
    settings = await Setting.create({
      fullName: "",
    });
  }

  Object.assign(settings, data);

  await settings.save();

  return settings;
};

const updateResume = async (
  resume
) => {
  let settings =
    await Setting.findOne();

  if (!settings) {
    settings =
      await Setting.create({
        fullName: "",
      });
  }

  settings.resume = resume;

  await settings.save();

  return settings;
};

module.exports = {
  getSettings,
  updateSettings,
  updateResume,
  updateProfileImage,
};