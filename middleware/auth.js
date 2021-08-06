require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header('x-auth-token');

  if (!token) {
    // if not token, deny auth
    return res.status(401).json({ msg: 'No token, Authorization denied' });
  }

  try {
    // decode as jwt.verify(token, secretkey)
    const decoded = jwt.verify(token, process.env.jwtSecret);
    
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
