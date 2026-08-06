const analyticsService = require("../services/analytics.service");

const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");

/* -------------------------------------------------------------------------- */
/*                            Get Analytics                                   */
/* -------------------------------------------------------------------------- */

const getAnalytics = catchAsync(async (req, res) => {
  const analytics = await analyticsService.getAnalytics();

  res.json(ApiResponse.success(analytics));
});

/* -------------------------------------------------------------------------- */
/*                     Increment Portfolio Views                              */
/* -------------------------------------------------------------------------- */

const incrementPortfolioViews = catchAsync(async (req, res) => {
  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "";

  await analyticsService.incrementPortfolioViews(ip);

  res.status(204).send();
});

/* -------------------------------------------------------------------------- */
/*                      Increment Project Views                               */
/* -------------------------------------------------------------------------- */

const incrementProjectViews = catchAsync(async (req, res) => {
  await analyticsService.incrementProjectViews();

  res.status(204).send();
});

/* -------------------------------------------------------------------------- */
/*                    Increment Certificate Views                             */
/* -------------------------------------------------------------------------- */

const incrementCertificateViews = catchAsync(async (req, res) => {
  await analyticsService.incrementCertificateViews();

  res.status(204).send();
});

module.exports = {
  getAnalytics,
  incrementPortfolioViews,
  incrementProjectViews,
  incrementCertificateViews,
};