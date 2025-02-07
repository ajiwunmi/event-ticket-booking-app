import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import {sequelize} from "./database/index.js"; 
import userRoutes from "./routes/userRoute.js";
import { errorHandler } from "./middlewares/errorMiddleware.js"; 
import logger from "./utils/logger.js";

const app = express();

// Add Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/users", userRoutes);

// Global Error Handler Middleware
app.use(errorHandler);

// Server Start Logic
async function startServer() {
	try {
		// Check Database Connection
		await sequelize.authenticate();

		logger.info("Sync all models");
		// Sync all models
		await sequelize.sync({ force: false });

		logger.info("Database connected successfully");

		const server = app.listen(process.env.PORT || 5002, () => {
			logger.info(`Server started on port: ${process.env.PORT || 5002}`);
		});

		// Handle server errors
		server.on("error", (err) => {
			if (err.code === "EADDRINUSE") {
				logger.warn("Port is in use, trying a different port...");
				app.listen(0, () => logger.warn("Server running on a dynamic port"));
			} else {
				logger.error(`Server failed to start: ${err.message}`);
			}
		});

		// Graceful shutdown on SIGTERM or SIGINT
		process.on("SIGTERM", async () => {
			logger.info("SIGTERM signal received. Closing server gracefully...");
			await shutdown(server);
		});

		process.on("SIGINT", async () => {
			logger.info("SIGINT signal received. Closing server gracefully...");
			await shutdown(server);
		});
	} catch (error) {
		logger.error("Unable to connect to the database:", error);
		process.exit(1); // Exit the process if DB connection fails
	}
}

// Graceful shutdown function
async function shutdown(server) {
	server.close(async () => {
		console.log("HTTP server closed.");
		await sequelize.close(); // Close DB connection
		console.log("Database connection closed.");
		process.exit(0);
	});
}

startServer();


export default app;
