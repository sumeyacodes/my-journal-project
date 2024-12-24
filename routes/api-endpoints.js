// Import the Express module, a web framework for Node.js
import express from "express";

// Create a new router instance for handling routes
const router = express.Router();

// Testing connection
router.get("/", async function (req, res) {
    res.send("Hello world");
});

// Export the router for use in other modules
export default router;
