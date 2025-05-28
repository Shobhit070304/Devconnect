const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected successfully!");
    })
    .catch((err) => console.log("Error connecting to MongoDB : ", err.message));
}

module.exports = connectDB;

