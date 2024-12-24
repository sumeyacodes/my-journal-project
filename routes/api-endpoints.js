import { addJournalEntry } from "../utils/helper-functions.js";
import express from "express";

const router = express.Router();

// Test the server connection
router.get("/", async function (req, res) {
  res.send("Hello Journal");
});

// POST request for adding a journal entry
router.post("/post", async function (req, res) {
  try {
    const entryMessage = req.body; 

     // throw error if message is invalid or empty
    if (!entryMessage || entryMessage === ' ') {
      return res.status(400).json({ 
        status: "Message is required",
        statusURL:  "https://http.cat/400"
     });
    }

    // if not, send req body to be processed
    const addedEntry = await addJournalEntry(entryMessage); 

    // success message
    if (addedEntry) {
        return res.status(201).json({ 
            status: "Journal entry added", 
            statusURL:  "https://http.cat/201", 
            addedEntry,
         });
    }  else {
        // just in case any issues with input
        return res.status(400).json({ 
            status: "Error: invalid input - please try again." ,
            statusURL: "https://http.cat/400"
        });
    }

  } catch (error) {
    // server related errors
    console.error("Error handling POST request:", error);

    return res.status(500).json( {
        status: "Internal Server Error: An unexpected error occurred while handling POST request. Please try again.", 
        error, 
        statusURL: "https://http.cat/500"
    });
  }
});

// Export the router for use in other modules
export default router;
