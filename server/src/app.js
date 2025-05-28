require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/db");
const cookieParser = require("cookie-parser");

// Import routes
const userRoutes = require("./routes/user-routes");
const profileRoutes = require("./routes/profile-routes");
const postRoutes = require("./routes/post-routes");

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get("/api", (req, res) => {
  res.send("Hello World");
});
app.use("/api/auth", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/post", postRoutes);


module.exports = app;
