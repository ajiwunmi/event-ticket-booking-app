const jwt = require("jsonwebtoken");
const SECRET_KEY = "supersecretkey";

const authenticateUser = (req, res, next) => {
	const token = req.headers["authorization"];
	if (!token) return res.status(401).json({ message: "Unauthorized" });

	jwt.verify(token, SECRET_KEY, (err, decoded) => {
		if (err) return res.status(403).json({ message: "Invalid token" });

		req.userId = decoded.userId;
		next();
	});
};

module.exports = authenticateUser;
