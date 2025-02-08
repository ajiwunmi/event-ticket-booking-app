import AppError from "./AppError.js";
import logger from "./logger.js"; 

export function handleError(err, context) {
	if (err instanceof AppError) {
		logger.error(`AppError in ${context}: ${err.message}`);
		throw err; 
	}

	logger.error(`Unexpected error in ${context}: ${err.message}`);
	throw new AppError("An unexpected error occurred. Please try again.", 500);
}
