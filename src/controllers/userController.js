import { signupService, loginService } from "../services/userService.js";
import constants from "../constants/index.js";
import AppError from "../utils/AppError.js"; // Custom AppError class
import logger from "../utils/logger.js"; // Import logger

// Create user
export const registerUser = async (req, res, next) => {
	logger.info("Starting user registration...");

	let response = { ...constants.defaultServerResponse };

	try {
		const user = await signupService(req.body);
		response.status = 201;
		response.message = constants.userMessage.SIGN_UP_SUCCESS;
		response.body = user;

		logger.info(`User registered successfully with email: ${req.body.email}`);
		return res
			.status(response.status)
			.json({ message: response.message, body: response.body });
	} catch (err) {
		logger.error(`Error during user registration: ${err.message}`);
		return next(new AppError(err.message, 400)); 
	}
};

//login
export const loginUser = async (req, res, next ) => {
	logger.info("Starting user login...");

 	let response = { ...constants.defaultServerResponse };
 	try {
 		const token = await loginService(req.body);
 		
 		response.status = 200;
 		response.message = constants.userMessage.LOGIN_SUCCESS; 		

		logger.info(`User logged in successfully`);
		return res
			.status(response.status)
			.json({ message: response.message, token:token });
 		
 	} catch (err) {
 		logger.error(`Error during user login : ${err.message}`);
		return next(new AppError(err.message, 400)); 
 	}
 	
 };


// exports.loginUser = async (req, res) => {
// 	const { username, password } = req.body;
// 	try {
// 		const user = await User.findOne({ where: { username } });
// 		if (!user) return res.status(404).json({ message: "User not found" });

// 		const match = await bcrypt.compare(password, user.password);
// 		if (!match) return res.status(401).json({ message: "Invalid password" });

// 		const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
// 			expiresIn: "1h",
// 		});
// 		res.status(200).json({ message: "Login successful", token });
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// };

///////////////////////////////////////////////////////////////

// const userService = require("../service/userService");
// const jwt = require("jsonwebtoken");
// const keys = require("../config");
// const { resetPasswordViaMail } = require("../helper/messenger");

//Update user
// module.exports.updateUser = async (req, res) => {
// 	let response = { ...constants.defaultServerResponse };
// 	req.body.userGroup = req.body.userGroup.split(",");
// 	try {
// 		await userService.updateUser(req.body);
// 		response.status = 200;
// 		response.message = "User Updated";
// 	} catch (err) {
// 		response.message = "User update fail";
// 	}
// 	return res.status(response.status).send(response);
// };

// //Update password
// module.exports.updatePassword = async (req, res) => {
// 	let response = { ...constants.defaultServerResponse };
// 	const login = req.headers.authorization.split("Bearer")[1].trim();
// 	const decoded = jwt.verify(login, keys.SECRET_KEY || "my-secret-key");
// 	req.body.token = decoded.user;

// 	try {
// 		await userService.updatePassword(req.body);
// 		response.status = 200;
// 		response.message = "Password Updated";
// 	} catch (err) {
// 		response.message = "Password Update Failed";
// 	}
// 	return res.status(response.status).send(response);
// };

// //Reset password
// module.exports.resetPassword = async (req, res) => {
// 	let response = { ...constants.defaultServerResponse };
// 	req.body.genPass = Math.floor(new Date() / 1000);

// 	try {
// 		await userService.resetPassword(req.body);

// 		const genPass = req.body.genPass;
// 		const email = req.body.email;

// 		response.status = 200;
// 		response.message =
// 			"New Password sent to email associated with this account";
// 		resetPasswordViaMail(email, genPass);
// 	} catch (err) {
// 		response.message = err.message;
// 	}
// 	return res.status(response.status).send(response);
// };



// //fetch signup info
// module.exports.signUpInfo = async (req, res) => {
// 	let response = { ...constants.defaultServerResponse };
// 	try {
// 		const responseFromService = await userService.signUpInfo();
// 		response.status = 200;
// 		response.body = responseFromService;
// 	} catch (err) {
// 		response.message = err.message;
// 	}
// 	return res.status(response.status).send(response);
// };

// //LIST USERS
// module.exports.listUsers = async (req, res) => {
// 	let response = { ...constants.defaultServerResponse };
// 	try {
// 		const responseFromService = await userService.listUsers(req.query);
// 		response.status = 200;
// 		response.message = "Fetch success";
// 		response.body = responseFromService;
// 	} catch (error) {
// 		console.log("Something went wrong: Controller: List Users", error);
// 		response.message = error.message;
// 	}
// 	return res.status(response.status).send(response);
// };

// //View User
// module.exports.viewUser = async (req, res) => {
// 	const login = req.headers.authorization.split("Bearer")[1].trim();
// 	const decoded = jwt.verify(login, keys.SECRET_KEY || "my-secret-key");
// 	req.body.token = decoded.user;

// 	let response = { ...constants.defaultServerResponse };
// 	try {
// 		const responseFromService = await userService.viewUser(req.body);
// 		if (responseFromService) {
// 			response.status = 200;
// 			response.message = "Successful";
// 			response.body = responseFromService;
// 		} else {
// 			response.message.failed = "Failed to create";
// 		}
// 	} catch (err) {
// 		response.message = err.message;
// 		console.log("Oops... something went wrong: controller : View user", err);
// 	}
// 	return res.status(response.status).send(response);
// };

// //ITEMS
// module.exports.getAllItems = async (req, res) => {
// 	let response = { ...constants.defaultServerResponse };
// 	try {
// 		const responseFromService = await userService.getAllItems(req.query);
// 		response.status = 200;
// 		response.message = "Fetch success";
// 		response.body = responseFromService;
// 	} catch (error) {
// 		console.log("Something went wrong: Controller: getAllItems", error);
// 		response.message = error.message;
// 	}
// 	return res.status(response.status).send(response);
// };

// ///////////////////////////////////
