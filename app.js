// Import the Express module, a web framework for Node.js
import express from "express";

// Import the router for handling API endpoints
import router from "./routes/api-endpoints.js";

// Create an instance of an Express application
const app = express();

// Middleware to parse incoming JSON requests and attach the data to req.body
app.use(express.json());

// Use the imported router for handling routes starting from the root ("/")
app.use("/", router);

// Export the app instance for use in other modules
export default app;
