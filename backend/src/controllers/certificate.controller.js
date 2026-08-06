const certificateService = require("../services/certificate.service");
const cloudinaryService = require("../services/cloudinary.service");

const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");

/* -------------------------------------------------------------------------- */
/*                           Create Certificate                               */
/* -------------------------------------------------------------------------- */

const createCertificate = catchAsync(async (req, res) => {
  let image = {
    url: "",
    publicId: "",
  };

  if (req.file) {
    image = await cloudinaryService.uploadImage(
      req.file.buffer,
      "portfolio/certificates"
    );
  }

  const certificate =
    await certificateService.createCertificate({
      ...req.body,
      image,
    });

  res.status(201).json(
    ApiResponse.success(
      certificate,
      "Certificate created successfully."
    )
  );
});

/* -------------------------------------------------------------------------- */
/*                         Get All Certificates                               */
/* -------------------------------------------------------------------------- */

const getCertificates = catchAsync(async (req, res) => {
  const certificates =
    await certificateService.getCertificates();

  res.json(ApiResponse.success(certificates));
});

/* -------------------------------------------------------------------------- */
/*                    Get Featured Certificates                               */
/* -------------------------------------------------------------------------- */

const getFeaturedCertificates = catchAsync(async (req, res) => {
  const certificates =
    await certificateService.getFeaturedCertificates();

  res.json(ApiResponse.success(certificates));
});

/* -------------------------------------------------------------------------- */
/*                     Get Certificate By ID                                  */
/* -------------------------------------------------------------------------- */

const getCertificate = catchAsync(async (req, res) => {
  const certificate =
    await certificateService.getCertificateById(req.params.id);

  res.json(ApiResponse.success(certificate));
});

/* -------------------------------------------------------------------------- */
/*                     Get Admin Certificates                                 */
/* -------------------------------------------------------------------------- */

const getAdminCertificates = catchAsync(async (req, res) => {
  const certificates =
    await certificateService.getAdminCertificates();

  res.json(ApiResponse.success(certificates));
});

/* -------------------------------------------------------------------------- */
/*                         Update Certificate                                 */
/* -------------------------------------------------------------------------- */

const updateCertificate = catchAsync(async (req, res) => {
  const existingCertificate =
    await certificateService.getCertificateById(req.params.id);

  let image = existingCertificate.image;

  if (req.file) {
    if (image?.publicId) {
      await cloudinaryService.deleteImage(
        image.publicId
      );
    }

    image =
      await cloudinaryService.uploadImage(
        req.file.buffer,
        "portfolio/certificates"
      );
  }

  const certificate =
    await certificateService.updateCertificate(
      req.params.id,
      {
        ...req.body,
        image,
      }
    );

  res.json(
    ApiResponse.success(
      certificate,
      "Certificate updated successfully."
    )
  );
});

/* -------------------------------------------------------------------------- */
/*                         Delete Certificate                                 */
/* -------------------------------------------------------------------------- */

const deleteCertificate = catchAsync(async (req, res) => {
  const certificate =
    await certificateService.getCertificateById(req.params.id);

  if (certificate.image?.publicId) {
    await cloudinaryService.deleteImage(
      certificate.image.publicId
    );
  }

  await certificateService.deleteCertificate(
    req.params.id
  );

  res.json(
    ApiResponse.success(
      null,
      "Certificate deleted successfully."
    )
  );
});

/* -------------------------------------------------------------------------- */
/*                        Toggle Featured                                     */
/* -------------------------------------------------------------------------- */

const toggleFeatured = catchAsync(async (req, res) => {
  const certificate =
    await certificateService.toggleFeatured(req.params.id);

  res.json(ApiResponse.success(certificate));
});

/* -------------------------------------------------------------------------- */
/*                        Toggle Published                                    */
/* -------------------------------------------------------------------------- */

const togglePublished = catchAsync(async (req, res) => {
  const certificate =
    await certificateService.togglePublished(req.params.id);

  res.json(ApiResponse.success(certificate));
});

module.exports = {
  createCertificate,
  getCertificates,
  getFeaturedCertificates,
  getCertificate,
  getAdminCertificates,
  updateCertificate,
  deleteCertificate,
  toggleFeatured,
  togglePublished,
};