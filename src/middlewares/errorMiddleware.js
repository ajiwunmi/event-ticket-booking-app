export function errorHandler(err, req, res, next) {
	console.error(`[Error]: ${err.message || "Unexpected Error"}`);

	const statusCode = err.status || 500;
	res.status(statusCode).json({
		success: false,
		message: err.message || "Internal Server Error",
		error: process.env.NODE_ENV === "development" ? err.stack : undefined,
	});
}
