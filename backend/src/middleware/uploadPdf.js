const multer = require("multer");

/* -------------------------------------------------------------------------- */
/*                             Memory Storage                                 */
/* -------------------------------------------------------------------------- */

const storage = multer.memoryStorage();

/* -------------------------------------------------------------------------- */
/*                               File Filter                                  */
/* -------------------------------------------------------------------------- */

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    return cb(null, true);
  }

  cb(
    new Error(
      "Only PDF files are allowed."
    ),
    false
  );
};

/* -------------------------------------------------------------------------- */
/*                               Upload                                       */
/* -------------------------------------------------------------------------- */

const uploadPdf = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

module.exports = uploadPdf;