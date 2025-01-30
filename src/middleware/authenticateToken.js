const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = async(req, res, next) => {
  const token = await req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;