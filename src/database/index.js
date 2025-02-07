import { Sequelize  } from "sequelize";
import  {db_config}  from "../config/index.js";
import dotenv from "dotenv";

const env = process.env.NODE_ENV || "development";
const config = db_config[env];

export const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port
});

export const connect_db = async () => {
    // console.log("Connecting to the database...", {...config});
    try {
			await sequelize.authenticate();
			console.log("DB Connection has been established successfully.");
			// Sync all models
			await sequelize.sync({ force: false }); 
			console.log("All models were synchronized successfully.");
		} catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
