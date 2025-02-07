const transaction = await sequelize.transaction();

try {
	const event = await Event.findByPk(eventId, { transaction });
	if (event.available_tickets > 0) {
		event.available_tickets--;
		await event.save({ transaction });

		await Order.create(
			{ event_id: eventId, user_id: userId, status: "booked" },
			{ transaction }
		);
		await transaction.commit();
		res.status(200).json({ message: "Ticket booked successfully" });
	} else {
		await WaitingList.create(
			{ event_id: eventId, user_id: userId },
			{ transaction }
		);
		await transaction.commit();
		res.status(200).json({ message: "Added to the waiting list" });
	}
} catch (error) {
	await transaction.rollback();
	res.status(500).json({ error: error.message });
}
