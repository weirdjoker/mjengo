const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Validation errors (from express-validator)
  if (err.errors && Array.isArray(err.errors)) {
    return res.status(400).json({ errors: err.errors });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({ error: 'Duplicate username or email' });
  }

  // Generic error
  res.status(err.status || 500).json({
    error: err.message || 'Server error',
  });
};

module.exports = errorHandler;