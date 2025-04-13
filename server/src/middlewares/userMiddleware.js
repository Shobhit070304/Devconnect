const jwt = require("jsonwebtoken");

module.exports.userAuth = async (req, res, next) => {
  try {
    // Check if the request has a token in the headers or cookie
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }
      req.user = decoded; // Attach the user data to the request object
      next(); // Call the next middleware or route handler
    });
  } catch (error) {
    console.error("Error in userAuth middleware:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
