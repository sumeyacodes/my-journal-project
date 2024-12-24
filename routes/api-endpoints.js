import { addJournalEntry, validateEntryMessage } from "../utils/helper-functions.js";
import express from "express";

const router = express.Router();

// Test the server connection
router.get("/", async function (req, res) {
  res.send("Hello Journal");
});

// POST request for journal entry & input validation middleware
router.post("/post", validateEntryMessage, async function (req, res) {
  try {

    const entryMessage = req.body.entryMessage; 
    const addedEntry = await addJournalEntry(entryMessage); 

    if (addedEntry) {
        return res.status(201).json({ 
            status: "Success: Journal entry added", 
            statusURL:  "https://http.cat/201", 
            payload: addedEntry,
         });
    }  else {
        return res.status(400).json({ 
            status: "Error: Invalid input - please try again." ,
            statusURL: "https://http.cat/400",
            payload: null,

        });
    }

  } catch (error) {
    console.error("Error handling POST request:", error);

    return res.status(500).json( {
        status: "Server Error: An unexpected error occurred while handling POST request. Please try again.",
        error: error.message,
        statusURL: "https://http.cat/500",
        payload: null,

    });
  }
});

// Export the router for use in other modules
export default router;
