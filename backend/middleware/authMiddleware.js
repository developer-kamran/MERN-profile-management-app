import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    try {
      const user = await User.findById(decodedToken.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
};

export default authenticateToken;
