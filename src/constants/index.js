export default {
	defaultServerResponse: {
		status: 400,
		message: "",
		body: {},
	},
	userMessage: {
		LOGIN_SUCCESS: "Login success",
		SIGN_UP_SUCCESS: "User successfully created",
		INVALID_LOGIN_CREDENTIALS: "Invalid login credentials",
	},
	tokenMessage: {
		TOKEN_SENT:
			"A six digit token has been sent to the phone number and email address associated with the provided Tax Id",
		INVALID_TAX_ID: "The taxId provided does not exist",
		INVALID_TOKEN: "Invalid token",
		TOKEN_RESENT: "Token has been resent",
	},
	requestValidationMessage: {
		BAD_REQUEST: "Invalid fields",
		TOKEN_MISSING: "Token missing from header",
	},
	databaseMessage: {
		INVALID_ID: "Invalid Id",
	},
};
