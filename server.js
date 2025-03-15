// Import necessary modules
const express = require("express");

// Import node-localstorage
const { LocalStorage } = require("node-localstorage");

const app = express();
const PORT = 3002;

// Create an instance of LocalStorage, pointing to the 'data' folder
const localStorage = new LocalStorage("./data");

// Example: Set an item
localStorage.setItem(
  "user",
  JSON.stringify({ name: "John Doe", role: "student" })
);

// Example: Get an item
const user = JSON.parse(localStorage.getItem("user"));
console.log(user);

// Middleware to parse JSON request bodies
app.use(express.json());

// GET Route - Fetch stored data
app.get("/api/data", (req, res) => {
  // Retrieve the stored data
  const data = localStorage.getItem("data");

  if (data) {
    // If data exists, return it
    res.json({ success: true, data: JSON.parse(data) });
  } else {
    // If no data found, return a message
    res.json({ success: false, message: "No data found" });
  }
});

// POST Route - Store data
app.post("/api/data", (req, res) => {
  const newData = req.body; // Get the data from the request body

  // If the incoming data is valid, store it in localStorage
  if (newData && newData.name && newData.age) {
    localStorage.setItem("data", JSON.stringify(newData));
    res.json({
      success: true,
      message: "Data stored successfully",
      data: newData,
    });
  } else {
    // If the data is incomplete, send an error
    res.status(400).json({
      success: false,
      message: "Invalid data format. Name and age are required.",
    });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
