const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const profileController = require("../controllers/profile-controller");
const userMiddleware = require("../middlewares/userMiddleware");

//Create or Update Profile
router.post(
  "/",
  userMiddleware.userAuth,
  [
    body("bio").notEmpty().withMessage("Bio is required"),
    body("about").notEmpty().withMessage("About is required"),
    body("skills").notEmpty().withMessage("Skills are required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("role").notEmpty().withMessage("Role is required"),
  ],
  profileController.createOrUpdateProfile
);

//Get Profile
router.get("/me", userMiddleware.userAuth, profileController.getProfile);

//Get All Profiles
router.get(
  "/all-profiles",
  userMiddleware.userAuth,
  profileController.getAllProfiles
);

//Get Profile by ID
router.get(
  "/user/:id",
  userMiddleware.userAuth,
  profileController.getProfileById
);

module.exports = router;
