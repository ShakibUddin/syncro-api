const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const { format, transports } = winston;

const logger = winston.createLogger({
  format: format.combine(
    format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
    format.printf(
      ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
    )
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: "logs/application-%DATE%.log",
      datePattern: "MM-DD-YYYY",
      zippedArchive: true, // Set to true if you want to compress the archived logs
      maxSize: "20m", // Maximum size of the log file before rotation, here m means megabyte
      maxFiles: "14d", // Keep logs for the last 14 days
    }),
  ],
});

module.exports = logger;
