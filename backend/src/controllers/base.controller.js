const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");

const createBaseController = (service, resourceName = "Resource") => ({
  create: catchAsync(async (req, res) => {
    const document = await service.create(req.body);

    res.status(201).json(
      ApiResponse.success(
        document,
        `${resourceName} created successfully.`
      )
    );
  }),

  getAll: catchAsync(async (req, res) => {
    const documents = await service.getAll();

    res.json(ApiResponse.success(documents));
  }),

  update: catchAsync(async (req, res) => {
    const document = await service.update(
      req.params.id,
      req.body
    );

    res.json(
      ApiResponse.success(
        document,
        `${resourceName} updated successfully.`
      )
    );
  }),

  remove: catchAsync(async (req, res) => {
    await service.remove(req.params.id);

    res.json(
      ApiResponse.success(
        null,
        `${resourceName} deleted successfully.`
      )
    );
  }),
});

module.exports = createBaseController;