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
      maxlength: 300,
    },
    skills: {
      type: [String],
      required: true,
    },
    website: String,
    github: String,
    linkedin: String,
    leetcode: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
