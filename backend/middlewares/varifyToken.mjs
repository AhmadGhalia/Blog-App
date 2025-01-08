import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function verifyToken(req, res, next) {
  const authToken = req.headers.authorization; // Fix header access
  if (authToken) {
    const token = authToken.split(" ")[1]; // Fix typo in split
    try {
      const decodedPayload = jwt.verify(token, process.env.SECRET_KEY); // Fix jwt import and usage
      req.user = decodedPayload; // Attach user payload to request
      next(); // Proceed to next middleware
    } catch (error) {
      return res.status(401).json({ message: "Access denied. Invalid token" }); // Fix error message
    }
  } else {
    return res.status(401).json({ message: "Access denied. No token provided" });
  }
}

function verifyAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next(); // User is admin, proceed
    } else {
      return res.status(403).json({ message: "Access denied. You are not an admin" });
    }
  });
}
function verifytokenOnlyUser(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id===req.params.id) {
      next(); 
    } else {
      return res.status(403).json({ message: "Not allowd, only himself" });
    }
  });
}

export {verifyToken, verifyAdmin, verifytokenOnlyUser};
