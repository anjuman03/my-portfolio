const winston = require("winston");

const { combine, timestamp, colorize, printf, errors, json } =
  winston.format;

const developmentFormat = combine(
  colorize(),
  timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  errors({
    stack: true,
  }),
  printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}] ${stack || message}`;
  })
);

const productionFormat = combine(
  timestamp(),
  errors({
    stack: true,
  }),
  json()
);

const logger = winston.createLogger({
  level:
    process.env.NODE_ENV === "production"
      ? "info"
      : "debug",

  format:
    process.env.NODE_ENV === "production"
      ? productionFormat
      : developmentFormat,

  transports: [
    new winston.transports.Console(),
  ],

  exitOnError: false,
});

logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

module.exports = logger;