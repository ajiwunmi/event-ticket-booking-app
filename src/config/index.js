import dotenv from "dotenv";
dotenv.config();

export const db_config = {
	"development": {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME_TK,
		port: process.env.DB_PORT,
		dialect: process.env.DB_DIALECT,
	},
	"test": {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME_TK,
		port: process.env.DB_PORT,
		dialect: process.env.DB_DIALECT,
	},
	"production": {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME_TK,
		port: process.env.DB_PORT,
		dialect: process.env.DB_DIALECT,
	}
};
