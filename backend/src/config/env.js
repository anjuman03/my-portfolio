require("dotenv").config();

const requiredEnv = [
  "PORT",
  "MONGODB_URI",
  "JWT_SECRET",
  "CLIENT_URL",
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`⚠ Missing environment variable: ${key}`);
  }
});

const env = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: Number(process.env.PORT) || 5000,

  mongodbUri: process.env.MONGODB_URI,

  clientUrl: process.env.CLIENT_URL,

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  email: {
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

module.exports = { env };