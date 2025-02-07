const Order = require("../models/order.model");

exports.getUserOrders = async (req, res) => {
	try {
		const orders = await Order.findAll({ where: { user_id: req.userId } });
		res.status(200).json({ orders });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
