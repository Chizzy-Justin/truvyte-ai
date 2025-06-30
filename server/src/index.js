// src/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
require('./config/passport'); // initializes passport strategies

const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// Routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Global error handler (must come after routes)
app.use(errorHandler);

// Connect to MongoDB & start server
const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
