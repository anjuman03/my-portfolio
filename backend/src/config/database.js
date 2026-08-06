const mongoose = require("mongoose");
const { env } = require("./env");
const logger = require("./logger");

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(env.mongodbUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });

    logger.info(
      `✅ MongoDB Connected: ${connection.connection.host}`
    );
  } catch (error) {
    logger.error(
      `❌ MongoDB Connection Failed: ${error.message}`
    );

    process.exit(1);
  }
};

module.exports = connectDB;