const ApiError = require("../utils/ApiError");

const createBaseService = (Model) => ({
  create: async (data) => {
    return await Model.create(data);
  },

  getAll: async (filter = {}, sort = {}) => {
    return await Model.find(filter).sort(sort);
  },

  getById: async (id) => {
    const document = await Model.findById(id);

    if (!document) {
      throw ApiError.notFound("Resource not found.");
    }

    return document;
  },

  update: async (id, data) => {
    const document = await Model.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!document) {
      throw ApiError.notFound("Resource not found.");
    }

    return document;
  },

  remove: async (id) => {
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      throw ApiError.notFound("Resource not found.");
    }

    return document;
  },
});

module.exports = createBaseService;