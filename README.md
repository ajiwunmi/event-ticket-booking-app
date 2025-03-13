# Event Ticket Booking System

This project is a Node.js application that implements an event ticket booking system using Express.js, a relational database (RDBMS), and follows Test-Driven Development (TDD) principles. The system efficiently handles concurrency, manages a waiting list, and ensures data integrity.

## Features

* Initialize an event with a fixed number of tickets
* Book tickets with concurrent handling
* Manage a waiting list for sold-out events
* Handle ticket cancellations and automatic reallocation to waiting list users
* Save order details to a relational database
* Comprehensive error handling
* High code quality with modular design

## Prerequisites

Ensure you have the following installed:

* [Node.js](https://nodejs.org/) (v18 or later)
* [PostgreSQL](https://www.postgresql.org/) or another RDBMS
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Project Structure

```
├── __tests__           # TDD test files
│   ├── controllers
│   ├── services
│   └── routes
├── migrations          # Database migration files
├── src
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   └── eventController.js
│   ├── models
│   │   └── eventModel.js
│   ├── routes
│   │   └── eventRoutes.js
│   ├── services
│   │   └── bookingService.js
│   ├── app.js
│   └── server.js
├── .env
├── .gitignore
├── jest.config.js
├── package.json
├── README.md
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ajiwunmi/event-ticket-booking-app.git
   cd event-ticket-booking-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the project root and add the following environment variables:
   ```env
   PORT=3000
   DATABASE_URL=postgres://username:password@localhost:5432/event_db
   ```
4. Run database migrations:
   ```bash
   npx sequelize db:migrate
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

| Method   | Endpoint             | Description                         |
| -------- | -------------------- | ----------------------------------- |
| `POST` | `/initialize`      | Initialize a new event with tickets |
| `POST` | `/book`            | Book a ticket for a user            |
| `POST` | `/cancel`          | Cancel a ticket booking             |
| `GET`  | `/status/:eventId` | Get the current status of an event  |

### Sample Request (Initialize Event)

```json
POST /initialize
{
  "eventName": "Tech Conference 2025",
  "totalTickets": 100
}
```

### Sample Response (Status)

```json
{
  "eventId": "1",
  "eventName": "Tech Conference 2025",
  "availableTickets": 50,
  "waitingListCount": 5
}
```

## Running Tests

To run unit and integration tests with Jest:

```bash
npm test
```

For test coverage report:

```bash
npm run test:coverage
```

## Design Choices

* **Thread-Safety** : Ensured race conditions are handled during booking and cancellations.
* **Modular Code Structure** : Organized code for scalability and maintainability.
* **Database Migrations** : Used Sequelize for schema management.

## Bonus Features (Optional Enhancements)

* **Rate Limiting** : To prevent abuse and ensure fair usage.
* **Authentication** : Added security for sensitive operations.
* **Logging System** : For tracking system events and debugging.

## License

This project is licensed under the [MIT License](https://chatgpt.com/c/LICENSE).
