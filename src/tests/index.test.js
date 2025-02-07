import request from "supertest";
import app from "./index.js"; 
import { registerUser } from "./controllers/userController.js";

// Mocking the controller for testing isolated route logic
jest.mock("./controllers/userController.js", () => ({
	registerUser: jest.fn((req, res) =>
		res.status(201).json({ message: "User registered successfully!" })
	),
}));

describe("User Signup API Tests", () => {
	it("should successfully register a new user", async () => {
		const mockUser = {
			firstname: "John",
            lastname: "Doe",
			email: "johndoe@example.com",
			password: "Password123!",
		};

		const res = await request(app).post("/api/v1/users/signup").send(mockUser);

		expect(res.statusCode).toEqual(201);
		expect(res.body.message).toBe("User registered successfully!");
	});

	it("should fail when the request body is invalid", async () => {
		const invalidUser = {
			email: "johndoe@example.com",
		};

		const res = await request(app)
			.post("/api/v1/users/signup")
			.send(invalidUser);

		expect(res.statusCode).toEqual(400); 
		expect(res.body).toHaveProperty("error");
	});
});
