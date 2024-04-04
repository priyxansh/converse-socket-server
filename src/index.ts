import express from "express";

// Initialize the app
const app = express();

// Create a basic test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
