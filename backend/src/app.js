const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const { env } = require("./config/env");
const logger = require("./config/logger");

const app = express();
app.get("/", (req, res) => {
  res.send("Backend Working");
});
/* -------------------------------------------------------------------------- */
/*                               Security                                     */
/* -------------------------------------------------------------------------- */

app.use(helmet());

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);

/* -------------------------------------------------------------------------- */
/*                                Parsers                                     */
/* -------------------------------------------------------------------------- */

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* -------------------------------------------------------------------------- */
/*                              Performance                                   */
/* -------------------------------------------------------------------------- */

app.use(compression());

/* -------------------------------------------------------------------------- */
/*                                 Logging                                    */
/* -------------------------------------------------------------------------- */

app.use(
  morgan("dev", {
    stream: logger.stream,
  })
);

/* -------------------------------------------------------------------------- */
/*                              Health Check                                  */
/* -------------------------------------------------------------------------- */

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio Backend API is running 🚀",
    environment: env.nodeEnv,
  });
});

/* -------------------------------------------------------------------------- */
/*                                 API                                        */
/* -------------------------------------------------------------------------- */

app.use("/api", routes);

/*
Example:

const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
*/

// ---------------------------------------------------------
//                     Error handler 
// --------------------------------------------------------------------                    
app.use(errorHandler);

/* -------------------------------------------------------------------------- */
/*                                 404                                        */
/* -------------------------------------------------------------------------- */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

module.exports = app;