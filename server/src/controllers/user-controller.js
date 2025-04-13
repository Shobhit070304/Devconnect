const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const { validationResult } = require("express-validator");

//Register user
module.exports.registerUser = async (req, res) => {
  try {
    //Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    //Get the user data from the request body
    const { username, email, password } = req.body;

    //Check if the user already exists
    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      return res.status(422).json({ message: "User already exists" });
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    //Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    //Generate a JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    //Set the JWT token in a cookie
    res.cookie("token", token);

    //Send the response
    res.status(201).json({
      token: token,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//Login user
module.exports.loginUser = async (req, res) => {
  try {
    //Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    //Get the user data from the request body
    const { email, password } = req.body;

    //Check if the user exists
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      return res.status(422).json({ message: "Invalid credentials" });
    }

    //Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (!isPasswordCorrect) {
      return res.status(422).json({ message: "Invalid credentials" });
    }

    //Generate a JWT token
    const token = jwt.sign({ id: isUserExist._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    //Set the JWT token in a cookie
    res.cookie("token", token);

    //Send the response
    res.status(200).json({
      token: token,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//Logout user
module.exports.logoutUser = async (req, res) => {
  try {
    //Clear the JWT token from the client side
    res.cookie("token", "");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error logging out user:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//Get user data
module.exports.getUserData = async (req, res) => {
  try {
    //Get the user ID from the JWT token
    const userId = req.user.id;

    //Find the user in the database
    const user = await User.findById(userId).select("-password");

    //Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //Send the response
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error getting user data:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
