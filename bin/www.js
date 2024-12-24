// Import the app module from the parent directory (our server application logic)
import app from "../app.js";

// Define the port number, use the value from environment variable PORT if available, otherwise default to 3001
const PORT = process.env.PORT || 3001;

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});