import UserModel from "../models/userModel.js";
import constants from "../constants/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/index.js";
import AppError from "../utils/AppError.js"; 
import logger from "../utils/logger.js"; 
import { handleError } from "../utils/errorHandler.js";

const SECRET_KEY = jwtConfig.secretkey;

// New user sign-up
export const signupService = async (serviceData) => {
	let { password, email } = serviceData;
	
	try {
		logger.debug(`Attempting to find user with email: ${email}`);

		const existingUser = await UserModel.findOne({
			where: { email },
		});

		if (existingUser) {
			logger.error(`User with email ${email} already exists.`);
			throw new AppError(
				`User with provided email:${email} already exists`,
				409
			); 
		}

		logger.debug(`Hashing password for user: ${email}`);
		serviceData.password = await bcrypt.hash(password, 12);

		const newUser = await UserModel.create(serviceData);
		logger.info(`New user created with email: ${email}`);
		return newUser;
	} catch (err) {
		
		handleError(err, `Unexpected error during signup for email ${email}: ${err.message}`);
		
	}
};

export const loginService = async ({email, password}) => {
	
	try {
		logger.debug(`Attempting to find user with email: ${email}`);

		const user = await UserModel.findOne({ where: { email } });
		if (!user) {
			logger.error(constants.userMessage.INVALID_LOGIN_CREDENTIALS);
			throw new AppError(constants.userMessage.INVALID_LOGIN_CREDENTIALS, 401); 
		}
		const isValid = await bcrypt.compare(password, user.password);
		
		if (!isValid) {			
			logger.error(constants.userMessage.INVALID_LOGIN_CREDENTIALS);
			throw new AppError(constants.userMessage.INVALID_LOGIN_CREDENTIALS, 401); 
		}

		const token = jwt.sign(
			{ user: user.email, name: user.firstname + " " + user.lastname },
			SECRET_KEY,
			{
				expiresIn: "4h",
			}
		);
		logger.info(`user authenticated and login token generated`);		
		return token;		
		
	} catch (err) {
		handleError(
			err,
			`Unexpected error during login ${err.message}`
		);
	}
};
 


//Update User
// module.exports.updateUser = async (serviceData) => {
// 	console.log(serviceData);
// 	let pswd;
// 	pswd = serviceData.password;

// 	if (typeof pswd !== "undefined") {
// 		// console.log("worked", pswd)
// 		let { password } = serviceData;
// 		serviceData.password = await bcrypt.hash(password, 12);
// 	} else {
// 	}
// 	try {
// 		const updateUser = await UserModel.update(
// 			{
// 				name: serviceData.name,
// 				dept: serviceData.dept,
// 				phone: serviceData.phone,
// 				station: serviceData.station,
// 				password: serviceData.password,
// 				active: serviceData.active,
// 			},
// 			{ where: { email: serviceData.email } }
// 		);

// 		//Delete Groups
// 		const deleteUserGroup = await userGroupSchema.destroy({
// 			where: { user: serviceData.email },
// 		});

// 		let userGroups = serviceData.userGroup.map(
// 			async (group) =>
// 				await userGroupSchema.create({
// 					user: serviceData.email,
// 					group,
// 					createdBy: serviceData.createdBy,
// 				})
// 		);
// 		if (updateUser) {
// 			userGroups = await Promise.all(userGroups);
// 			return updateUser;
// 		}
// 	} catch (err) {
// 		console.log("Oops... something went wrong: service : Update user", err);
// 		throw new Error(err);
// 	}
// };

// module.exports.updatePassword = async ({ password, token }) => {
// 	try {
// 		password = await bcrypt.hash(password, 12);
// 		const updatePass = await UserModel.update(
// 			{ password },
// 			{ where: { email: token } }
// 		);

// 		if (updatePass[0] === 1) {
// 			return true;
// 		}
// 	} catch (error) {
// 		console.log("Something went wrong: Service: Update Password", error);
// 		throw new Error(error);
// 	}
// };

// module.exports.resetPassword = async ({ email, genPass }) => {
// 	try {
// 		console.log(genPass);
// 		password = await bcrypt.hash(`${genPass}`, 12);

// 		const chkEmail = await UserModel.findOne({ where: { email } });
// 		if (!chkEmail) {
// 			throw new Error("Email does not exist");
// 		}

// 		const updatePass = await UserModel.update(
// 			{ password },
// 			{ where: { email: email } }
// 		);

// 		if (updatePass[0] == 1) {
// 			return true;
// 		}
// 	} catch (error) {
// 		console.log("Something went wrong: Service: Update Password", error);
// 		throw new Error(error);
// 	}
// };


// //GET ITEMS
// module.exports.getAllItems = async ({}) => {
// 	try {
// 		let taxOffice = await taxOfficeSchema.findAll({});
// 		let department = await departmentSchema.findAll({});
// 		let rhmGroups = await rhmGroupSchema.findAll({});
// 		let sector = await sectorSchema.findAll({});
// 		let incomeSource = await incomeSourceSchema.findAll({});
// 		let state = await stateSchema.findAll({});
// 		let lga = await lgaSchema.findAll({});
// 		let orgType = await orgTypeSchema.findAll({});
// 		let revItem = await revItemSchema.findAll({});
// 		return {
// 			rhmGroups,
// 			taxOffice,
// 			department,
// 			sector,
// 			incomeSource,
// 			state,
// 			lga,
// 			orgType,
// 			revItem,
// 		};
// 	} catch (error) {
// 		console.log("Something went wrong: Service: getAllItems", error);
// 		throw new Error(error);
// 	}
// };

// //GET USERS
// module.exports.listUsers = async ({}) => {
// 	try {
// 		let users = await UserModel.findAll({});
// 		return { users };
// 	} catch (error) {
// 		console.log("Something went wrong: Service: listUsers", error);
// 		throw new Error(error);
// 	}
// };

// //View Users
// module.exports.viewUser = async ({ email }) => {
// 	try {
// 		const user = await sequelize.query(
// 			`SELECT *, (SELECT name FROM department WHERE id = rhm_users.dept limit 1) AS department FROM rhm_users WHERE email = '${email}'`,
// 			{ type: QueryTypes.SELECT }
// 		);
// 		const groups = await sequelize.query(
// 			`SELECT *, (SELECT role FROM rhm_groups WHERE id = rhm_user_group.group ) AS role FROM rhm_user_group WHERE user = '${email}'`,
// 			{ type: QueryTypes.SELECT }
// 		);

// 		return { user, groups };
// 	} catch (error) {
// 		console.log("Something went wrong: Service: View Users", error);
// 		throw new Error(error);
// 	}
// };

// //fetch signup info
// module.exports.signUpInfo = async () => {
// 	const departments = DepartmentSchema.findAll();
// 	const rhmGroups = RhmGroupSchema.findAll();
// 	try {
// 		const result = await Promise.all([departments, rhmGroups]);
// 		const dept = result[0];
// 		const rhm = result[1];
// 		const deptArr = [];
// 		const rhmArr = [];
// 		dept.forEach((dep) => {
// 			deptArr.push(dep.dataValues);
// 		});
// 		rhm.forEach((rh) => {
// 			rhmArr.push(rh.dataValues);
// 		});

// 		return { department: deptArr, userGroup: rhmArr };
// 	} catch (err) {
// 		console.log("Oops... something went wrong: service : login", err);
// 		throw new Error(err);
// 	}
// };
