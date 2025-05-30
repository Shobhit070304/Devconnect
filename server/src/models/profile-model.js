const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    website: String,
    github: String,
    linkedin: String,
    leetcode: String,
    portfolio: String,
    location: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    avatar: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
