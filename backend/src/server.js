const http = require("http");

const app = require("./app");
const connectDB = require("./config/database");
const { env } = require("./config/env");
const logger = require("./config/logger");

const PORT = env.port;

const startServer = async () => {
  try {
    await connectDB();

    const server = http.createServer(app);

    server.listen(PORT, () => {
      logger.info(`🚀 Server running on http://localhost:${PORT}`);
    });

    process.on("SIGINT", () => {
      logger.info("Shutting down server...");
      server.close(() => process.exit(0));
    });

    process.on("SIGTERM", () => {
      logger.info("Server terminated.");
      server.close(() => process.exit(0));
    });
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

startServer();