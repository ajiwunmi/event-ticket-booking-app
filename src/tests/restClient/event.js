const request = require("supertest");
const app = require("../server");

describe("POST /api/events", () => {
	it("should create an event", async () => {
		const response = await request(app)
			.post("/api/events")
			.send({ eventName: "Concert", totalTickets: 100 });
		expect(response.statusCode).toBe(201);
		expect(response.body.event.event_name).toBe("Concert");
	});
});
