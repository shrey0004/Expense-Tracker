const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const expenseRoutes = require("./routes/expenseRoutes.js");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/expenses", expenseRoutes);

console.log("🟢 Starting server...");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Loaded" : "❌ Missing");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Export the Express app for Vercel serverless
module.exports = app;
