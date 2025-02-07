const constants = require("../constants/index");
const jwt = require("jsonwebtoken");
const keys = require("../config");
const { createHmac } = require("crypto");

module.exports.validateToken = (req, res, next) => {
	let response = { ...constants.defaultServerResponse };
	try {
		if (!req.headers.authorization) {
			throw new Error(constants.requestValidationMessage.TOKEN_MISSING);
		}
		const token = req.headers.authorization.split("Bearer")[1].trim();
		const decoded = jwt.verify(token, keys.SECRET_KEY || "my-secret-key");

		return next();
	} catch (err) {
		console.log("Err", err);
		response.message = err.message;
		response.status = 401;
	}

	return res.status(response.status).send(response);
};

module.exports.webhookValidate = (req, res, next) => {
	const signatureHeader = req.headers["x-signature"];

	if (!signatureHeader) {
		return res.status(401).json({ message: "No Signature passed" });
	}
	const payload = JSON.stringify(req.body); // Assuming payload is in JSON format
	const secretKey = process.env.RHM_WEBHOOK_SECRET || "RHM_WEBHOOK_SECRETE";
	const hmac = createHmac("sha256", secretKey);
	const computedSignature = hmac.update(payload).digest("base64");
	if (computedSignature !== signatureHeader) {
		return res.status(401).json({ message: "Invalid signature" });
	}
	// If the signature is valid, you can access the parsed request body in req.body
	next();
};
