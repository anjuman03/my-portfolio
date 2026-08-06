const cloudinary = require("../config/cloudinary");

/* -------------------------------------------------------------------------- */
/*                           Upload Image                                     */
/* -------------------------------------------------------------------------- */

const uploadImage = async (fileBuffer, folder = "portfolio") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        },
      )
      .end(fileBuffer);
  });
};

const uploadResume = async (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "portfolio/resume",
          resource_type: "raw",
          public_id: fileName.replace(".pdf", ""),
          overwrite: true,
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve({
            url: result.secure_url,
            publicId: result.public_id,

            downloadUrl: cloudinary.url(result.public_id, {
              resource_type: "raw",
              format: "pdf",
              flags: "attachment:Patan_Anjuman_Resume.pdf",
            }),
          });
        },
      )
      .end(fileBuffer);
  });
};

const deleteFile = async (publicId) => {
  if (!publicId) return;

  return await cloudinary.uploader.destroy(publicId, {
    resource_type: "raw",
  });
};

/* -------------------------------------------------------------------------- */
/*                           Delete Image                                     */
/* -------------------------------------------------------------------------- */

const deleteImage = async (publicId) => {
  if (!publicId) return;

  return await cloudinary.uploader.destroy(publicId);
};

module.exports = {
  uploadImage,
  uploadResume,
  deleteImage,
  deleteFile,
};
