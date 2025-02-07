const express = require("express");
const router = express.Router();
const { getUserOrders } = require("../controllers/ticket.controller");
const authenticateUser = require("../middleware/authMiddleware");

// Secure the route with JWT authentication
router.get("/user-orders", authenticateUser, getUserOrders);

module.exports = router;
