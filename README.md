# RailMargdarshi Backend

Welcome to the backend service for **RailMargdarshi**, a modern application for managing and monitoring Indian Railways operations. This service is built with Node.js, Express, and MongoDB, providing a robust, role-based API to handle various operational tasks.

## Features

- **Role-Based Access Control**: Secure endpoints tailored to three distinct operational roles: Admin, Station Master, and Signal Controller.
- **Train and Station Management**: Comprehensive CRUD operations for managing trains, routes, schedules, and station details.
- **Real-time Traffic Control**: APIs for monitoring station traffic, controlling signals, and tracking train movements.
- **AI-Powered Conflict Resolution**: A service to provide intelligent suggestions for resolving operational conflicts like traffic congestion and route clashes.
- **System Analytics**: Endpoint for administrators to get a high-level overview of system health, including the number of running trains and zone-based congestion levels.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Dependencies**:
  - `cors`: For enabling Cross-Origin Resource Sharing
  - `dotenv`: For managing environment variables

## Project Structure

The backend is organized into a clean, modular structure to ensure separation of concerns and maintainability.

```
railmargdarshi-backend/
├── src/
│   ├── models/         # Mongoose schemas (Train, Station)
│   ├── controllers/    # Request handling logic for each role
│   ├── routes/         # API route definitions
│   ├── middleware/     # Custom middleware (e.g., role checking)
│   ├── services/       # Business logic (e.g., AI conflict resolution)
│   └── config/         # Database connection setup
├── .env                # Environment variables
├── .gitignore          # Git ignore file
├── package.json        # Project dependencies and scripts
└── server.js           # Main application entry point
```

## Getting Started

Follow these instructions to get a local copy of the backend up and running.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or on a cloud service)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repository-url>
   ```

2. **Navigate to the backend directory:**
   ```sh
   cd railmargdarshi-backend
   ```

3. **Install NPM packages:**
   ```sh
   npm install
   ```

### Configuration

1. Create a `.env` file in the root of the `railmargdarshi-backend` directory.
2. Add the following environment variables. Update the `MONGO_URI` if your database is not running on the default local port.

   ```env
   PORT=3001
   MONGO_URI=mongodb://localhost:27017/railmargdarshi
   ```

### Running the Server

- **Development Mode**: To run the server with hot-reloading using `nodemon`:
  ```sh
  npm run dev
  ```

- **Production Mode**: To run the server in a production environment:
  ```sh
  npm start
  ```

The API will be available at `http://localhost:3001`.

## API Endpoints

All endpoints require a `role` field in the JSON request body for authorization.

---

### Admin Role (`role`: "admin")

#### Train Management
- `POST /api/admin/trains`: Add a new train.
- `PUT /api/admin/trains/:trainId`: Update an existing train.
- `DELETE /api/admin/trains/:trainId`: Delete a train.

#### Station Management
- `POST /api/admin/stations`: Add a new station.
- `PUT /api/admin/stations/:stationId`: Update an existing station.
- `DELETE /api/admin/stations/:stationId`: Delete a station.

#### Analytics
- `POST /api/admin/analytics`: Get system-wide traffic analytics.
  - **Body**: `{ "role": "admin" }`

---

### Station Master Role (`role`: "station_master")

- `POST /api/station-master/traffic/:stationId`: Get traffic details for a specific station.
  - **Body**: `{ "role": "station_master" }`

- `POST /api/station-master/signal/update`: Stop or release a train by changing the signal.
  - **Body**: `{ "role": "station_master", "stationId": "NDLS", "trainId": "12622", "signalStatus": "green" }`

- `POST /api/station-master/conflict/resolve`: Get AI-powered suggestions to resolve a traffic conflict.
  - **Body**: `{ "role": "station_master", "trainA": { "name": "Tamil Nadu Express" }, "trainB": { "name": "AP Express" }, "station": { "name": "Nagpur" } }`

---

### Signal Controller Role (`role`: "signal_controller")

- `POST /api/signal-controller/status/:stationId`: View the current signal status at a station.
  - **Body**: `{ "role": "signal_controller" }`

- `POST /api/signal-controller/update`: Update the signal status at any station.
  - **Body**: `{ "role": "signal_controller", "stationId": "BPL", "status": "yellow" }`

- `POST /api/signal-controller/history/:trainId`: Query the signal history for a specific train.
  - **Body**: `{ "role": "signal_controller" }`

## Error Handling

The API returns consistent JSON error responses.

- **400 Bad Request**: Returned if the `role` field is missing from the request body.
  ```json
  {
      "message": "Role is required in the request body."
  }
  ```

- **403 Forbidden**: Returned if the provided `role` is not authorized for the endpoint.
  ```json
  {
      "message": "Forbidden: You do not have access to this resource."
  }
  ```

- **500 Internal Server Error**: Returned for any unhandled server-side errors.
  ```json
  {
      "success": false,
      "message": "Error message details."
  }
  ```
