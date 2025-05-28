const Profile = require("../models/profile-model");
const { validationResult } = require("express-validator");


module.exports.createOrUpdateProfile = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Get the profile data from the request body
    const { bio, about, skills, github, linkedin, website, leetcode, location, role, avatar } = req.body;

    const userId = req.user.id; // Assuming user ID is stored in req.user

    const profileData = {
      user: userId,
      bio,
      about,
      skills: skills.split(",").map((skill) => skill.trim()),
      github,
      linkedin,
      website,
      leetcode,
      location,
      role,
      avatar,
    };

    // Check if the profile already exists for the user
    let profile = await Profile.findOne({ user: userId });

    // If profile exists, update it with the new data
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: userId },
        { $set: profileData },
        { new: true }
      );
      return res.status(200).json(profile);
    }
    // If profile doesn't exist, create a new one
    profile = await Profile.create(profileData);
    if (!profile) {
      return res.status(400).json({ message: "Profile creation failed" });
    }
    // If profile creation is successful, return the profile
    return res.status(201).json(profile);
  } catch (error) {
    console.error("Error creating or updating profile:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["username", "email"]
    );
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    return res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "username",
      "email",
    ]);
    if (!profiles) {
      return res.status(404).json({ message: "No profiles found" });
    }
    return res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching all profiles:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Get profile by ID
module.exports.getProfileById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "Profile ID is required" });
    }

    const profile = await Profile.findOne({ user: req.params.id }).populate(
      "user",
      ["username", "email"]
    );
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    return res.status(200).json({ profile });
  } catch (error) {
    console.error("Error fetching profile by ID:", error);
    return res.status(500).json({ message: error.message });
  }
};
