import express from "express"; // Importing express module
import cors from "cors"; // Importing cors module
import activitiesRoutes from "./routes/activities.routes.js";


const app = express(); // Creating an instance of express
app.use(cors()); // Enabling CORS for all routes
app.use(express.json()); // Middleware to parse JSON request bodies


app.get("/", (req, res) => { // Defining a GET route at the root path
  res.json({ status: "Backend is running" }); // Sending a JSON response
});


app.get("/api/summary", (req, res) => {
  res.json({
    income: 2500,
    expenses: 1200,
    balance: 1300,
  });
});


app.use("/api/activities", activitiesRoutes);


app.listen(4000, () => { // Starting the server on port 4000
  console.log("Server on http://localhost:4000"); // Logging the server URL
});
