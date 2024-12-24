
import { promises as fs } from "node:fs";
import { FILEPATH } from "./config.js"
import { format } from 'date-fns';

export async function readEntries() {
  try {
    const data = await fs.readFile(FILEPATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
}

export async function writeEntries(data) {
  try {
    const JSONdata = JSON.stringify(data, null, 2)
    await fs.writeFile(FILEPATH, JSONdata, "utf8");
    return true;
  } catch (error) {
    console.error("Error writing file:", error);
    return false;
  }
}

export async function getEntries(){
    const entries = await readEntries();
    return entries
}

// probably better in it's own seperate middleware file
export function validateEntryMessage(req, res, next) {
  const entryMessage = req.body.entryMessage;

  if (!entryMessage || entryMessage.trim() === '') {
    return res.status(400).json({
      status: "Error: Message is required - please provide a valid entry.",
      statusURL: "https://http.cat/400",
      payload: null,
    });
  }
    // if validation passes, proceed
  next();
}

export async function addJournalEntry(entryMessage) {
    try {
        const entries = await getEntries();
        const dateAdded = new Date()

        const newEntry = {
            date: format(dateAdded, 'dd/MM/yyyy'),
            timestamp:  format(dateAdded.getTime(), 'hh:mm:ss a'),
            entryMessage,
        }

        entries.push(newEntry);
        await writeEntries(entries);
        return(newEntry);

      } catch (error) {
        console.error("Error adding journal entry:", error);
        throw new Error("An error occurred while adding the journal entry.");
      }
    }
