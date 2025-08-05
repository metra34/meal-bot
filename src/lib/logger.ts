import winston from "winston";
import "winston-daily-rotate-file";

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.printf(
      ({ level, message, timestamp }: winston.Logform.TransformableInfo) => {
        return `${timestamp as string} [${level}]: ${message as string}`;
      },
    ),
  ),
  transports: [
    // Daily rotating combined logs
    new winston.transports.DailyRotateFile({
      filename: "logs/combined-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
      zippedArchive: true,
    }),
    // Daily rotating error logs
    new winston.transports.DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
      level: "error",
      zippedArchive: true,
    }),
    // Console output for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `${timestamp as string} [${level}]: ${message as string}`;
        }),
      ),
    }),
  ],
});

export default logger;
