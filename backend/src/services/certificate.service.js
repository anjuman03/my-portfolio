const Certificate = require("../models/Certificate");
const ApiError = require("../utils/ApiError");

/* -------------------------------------------------------------------------- */
/*                           Create Certificate                               */
/* -------------------------------------------------------------------------- */

const createCertificate = async (data) => {
  return await Certificate.create(data);
};

/* -------------------------------------------------------------------------- */
/*                         Get All Certificates                               */
/* -------------------------------------------------------------------------- */

const getCertificates = async () => {
  return await Certificate.find({
    published: true,
  }).sort({
    order: 1,
    issueDate: -1,
  });
};

/* -------------------------------------------------------------------------- */
/*                      Get Featured Certificates                             */
/* -------------------------------------------------------------------------- */

const getFeaturedCertificates = async () => {
  return await Certificate.find({
    featured: true,
    published: true,
  }).sort({
    order: 1,
  });
};

/* -------------------------------------------------------------------------- */
/*                     Get Certificate By Slug                                */
/* -------------------------------------------------------------------------- */

const getCertificate = async (slug) => {
  const certificate = await Certificate.findOne({
    slug,
    published: true,
  });

  if (!certificate) {
    throw ApiError.notFound(
      "Certificate not found."
    );
  }

  return certificate;
};

/* -------------------------------------------------------------------------- */
/*                      Get Certificate By ID                                 */
/* -------------------------------------------------------------------------- */

const getCertificateById = async (id) => {
  const certificate =
    await Certificate.findById(id);

  if (!certificate) {
    throw ApiError.notFound(
      "Certificate not found."
    );
  }

  return certificate;
};

/* -------------------------------------------------------------------------- */
/*                         Get Admin Certificates                             */
/* -------------------------------------------------------------------------- */

const getAdminCertificates = async () => {
  return await Certificate.find().sort({
    order: 1,
    issueDate: -1,
  });
};

/* -------------------------------------------------------------------------- */
/*                         Update Certificate                                 */
/* -------------------------------------------------------------------------- */

const updateCertificate = async (
  id,
  data
) => {
  const certificate =
    await Certificate.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!certificate) {
    throw ApiError.notFound(
      "Certificate not found."
    );
  }

  return certificate;
};

/* -------------------------------------------------------------------------- */
/*                         Delete Certificate                                 */
/* -------------------------------------------------------------------------- */

const deleteCertificate = async (id) => {
  const certificate =
    await Certificate.findByIdAndDelete(id);

  if (!certificate) {
    throw ApiError.notFound(
      "Certificate not found."
    );
  }

  return certificate;
};

/* -------------------------------------------------------------------------- */
/*                        Toggle Featured                                     */
/* -------------------------------------------------------------------------- */

const toggleFeatured = async (id) => {
  const certificate =
    await getCertificateById(id);

  certificate.featured =
    !certificate.featured;

  await certificate.save();

  return certificate;
};

/* -------------------------------------------------------------------------- */
/*                        Toggle Published                                    */
/* -------------------------------------------------------------------------- */

const togglePublished = async (id) => {
  const certificate =
    await getCertificateById(id);

  certificate.published =
    !certificate.published;

  await certificate.save();

  return certificate;
};

module.exports = {
  createCertificate,
  getCertificates,
  getFeaturedCertificates,
  getCertificate,
  getCertificateById,
  getAdminCertificates,
  updateCertificate,
  deleteCertificate,
  toggleFeatured,
  togglePublished,
};