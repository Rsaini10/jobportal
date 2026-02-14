const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const { protect } = require("./middlewares/authMiddleware");
const jobRoutes = require("./routes/jobRoutes");
const path = require("path");

// Load environment variables
dotenv.config();
connectDB();
// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//multer middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route
app.get("/", (req, res) => {
  res.send("Job Portal API is running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
//testing middleware
app.get("/api/test", protect, (req, res) => {
  res.json({
    message: "You accessed protected route",
    user: req.user,
  });
});

// Define PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
