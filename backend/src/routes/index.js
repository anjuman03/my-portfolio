const express = require("express");

const router = express.Router();

router.use("/admin", require("./admin.routes"));

router.use("/projects", require("./project.routes"));

router.use(
  "/certificates",
  require("./certificate.routes")
);

router.use("/skills", require("./skill.routes"));

router.use(
  "/experiences",
  require("./experience.routes")
);

router.use(
  "/education",
  require("./education.routes")
);

router.use(
  "/settings",
  require("./setting.routes")
);

router.use(
  "/analytics",
  require("./analytics.routes")
);

module.exports = router;