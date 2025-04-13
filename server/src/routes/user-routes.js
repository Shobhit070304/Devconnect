const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/user-controller");
const userMiddleware = require("../middlewares/userMiddleware");

const router = express.Router();

// Register a new user
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser
);

// Login a user
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.loginUser
);

// Logout a user
router.post("/logout", userMiddleware.userAuth, userController.logoutUser);

// Get user details
router.get("/profile", userMiddleware.userAuth, userController.getUserData);

module.exports = router;
