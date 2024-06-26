const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // Controllo per escludere la rotta GET /api/photos dall'autenticazione
  if (req.method === 'GET' && req.originalUrl.startsWith('/api/photos')) {
    return next(); // Passa alla gestione successiva senza autenticazione
  }

  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied, token missing!' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token!' });

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
