const multer = require("multer");

/* -------------------------------------------------------------------------- */
/*                             Memory Storage                                 */
/* -------------------------------------------------------------------------- */

const storage = multer.memoryStorage();

/* -------------------------------------------------------------------------- */
/*                               File Filter                                  */
/* -------------------------------------------------------------------------- */

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    return cb(null, true);
  }

  cb(
    new Error(
      "Only image files are allowed."
    ),
    false
  );
};

/* -------------------------------------------------------------------------- */
/*                               Upload                                        */
/* -------------------------------------------------------------------------- */

const uploadImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = uploadImage;