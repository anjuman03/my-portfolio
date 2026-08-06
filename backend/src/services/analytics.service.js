const Analytics = require("../models/Analytics");

/* -------------------------------------------------------------------------- */
/*                           Get Analytics                                    */
/* -------------------------------------------------------------------------- */

const getAnalytics = async () => {
  let analytics = await Analytics.findOne();

  if (!analytics) {
    analytics = await Analytics.create({});
  }

  return analytics;
};

/* -------------------------------------------------------------------------- */
/*                    Increment Portfolio Views                               */
/* -------------------------------------------------------------------------- */

const incrementPortfolioViews = async (ip = "") => {
  const analytics = await getAnalytics();

  analytics.portfolioViews += 1;
  analytics.lastVisitor = ip;
  analytics.lastVisitedAt = new Date();

  await analytics.save();

  return analytics;
};

/* -------------------------------------------------------------------------- */
/*                     Increment Project Views                                */
/* -------------------------------------------------------------------------- */

const incrementProjectViews = async () => {
  const analytics = await getAnalytics();

  analytics.projectViews += 1;

  await analytics.save();

  return analytics;
};

/* -------------------------------------------------------------------------- */
/*                  Increment Certificate Views                               */
/* -------------------------------------------------------------------------- */

const incrementCertificateViews = async () => {
  const analytics = await getAnalytics();

  analytics.certificateViews += 1;

  await analytics.save();

  return analytics;
};

module.exports = {
  getAnalytics,
  incrementPortfolioViews,
  incrementProjectViews,
  incrementCertificateViews,
};