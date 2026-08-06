const { validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

const validateRequest = (validators) => {
  return [
    ...validators,

    (req, res, next) => {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return next();
      }

      return next(
        ApiError.badRequest(
          errors.array()[0].msg
        )
      );
    },
  ];
};

module.exports = validateRequest;