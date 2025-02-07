import express from "express";
import { newUserSchema } from "../schemas/userSchema.js";
import { registerUser } from "../controllers/userController.js";
import { validateBody } from "../middlewares/joiSchemaValidation.js";
// import tokenValidation from "../middleware/tokenValidation";

const router = express.Router();
router.post("/signup", validateBody(newUserSchema), registerUser);
// router
// 	.get("/signup", userController.signUpInfo)
// 	.post(
// 		"/signup",
// 		joieSchemaValidation.validateBody(userSchema.signUp),
// 		userController.signUp
// 	)
// 	.put("/update-user", tokenValidation.validateToken, userController.updateUser)

// 	.put("/reset-password", userController.resetPassword)

// 	.put(
// 		"/update-password",
// 		tokenValidation.validateToken,
// 		userController.updatePassword
// 	)

// 	.post(
// 		"/login",
// 		joieSchemaValidation.validateBody(userSchema.login),
// 		userController.login
// 	)
// 	.post("/user", tokenValidation.validateToken, userController.viewUser)
// 	.get("/users", tokenValidation.validateToken, userController.listUsers);



export default  router;
