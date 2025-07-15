const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger'); // Updated path
const cors = require('cors');
const passport = require('./config/passport');
const morgan = require('morgan');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(morgan('combined'));
app.use(requestLogger);

// Connect to database
connectDB();

// Routes
app.use('/api', require('./routes')); // Main routes (index.js)
app.use('/api/auth', require('./routes/auth')); // Auth routes

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));