const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
  
  if (req.url.startsWith('/auth')) {
    return next();
  }

  let token;
  
  // Check for token in the Authorization header for API requests
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.replace('Bearer ', '');
  }

  // If token is not found in the header, check cookies for browser requests
  if (!token && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    //res.redirect('/auth/login.html'); 
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authenticateUser;
