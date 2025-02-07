exports.initializeEvent = async (req, res) => {
	const { eventName, totalTickets } = req.body;
	try {
		const event = await Event.create({
			event_name: eventName,
			total_tickets: totalTickets,
			available_tickets: totalTickets,
		});
		res.status(201).json({ message: "Event initialized", event });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
