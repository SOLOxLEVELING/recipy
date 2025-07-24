const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get the token from the 'Authorization' header
  const authHeader = req.headers.authorization;

  // Check if the header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "No token provided, authorization denied." });
  }

  try {
    // Extract the token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user's information (from the token payload) to the request object
    req.user = decoded.user;

    // Proceed to the next function (the actual route handler)
    next();
  } catch (error) {
    res.status(401).json({ error: "Token is not valid." });
  }
};

module.exports = authMiddleware;
