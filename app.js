// Import the express module which is a web framework for Node.js
import express from "express";

// Import the astronautsRouter from the specified path
import messageRouter from "./routes/api-endpoints";

// Create an instance of an Express application
const app = express();

// Middleware to parse incoming JSON requests and make it available under req.body
app.use(express.json());

// Use the messageRouter for any requests to the /astronauts path
app.use("/message", messageRouter);

// Export the app instance so it can be used in other files
export default app;