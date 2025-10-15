import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/expenses", expenseRoutes);

console.log("🟢 Starting server...");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Loaded" : "❌ Missing");
console.log("PORT:", process.env.PORT || 4001);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(process.env.PORT || 4001, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 4001}`)
    );
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
