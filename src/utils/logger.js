import winston from "winston";

// Define custom logging formats
const logFormat = winston.format.combine(
	winston.format.colorize(),
	winston.format.timestamp(),
	winston.format.printf(({ timestamp, level, message }) => {
		return `[${timestamp}] ${level}: ${message}`;
	})
);

// Create a winston logger instance
const logger = winston.createLogger({
	level: process.env.NODE_ENV === "production" ? "info" : "debug",
	transports: [
		// Console log transport (for development)
		new winston.transports.Console({
			format: logFormat,
		}),
		// File log transport (for production)
		new winston.transports.File({
			filename: "logs/app.log",
			level: "info",
			format: logFormat,
		}),
	],
});

export default logger;
