// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
app.use(bodyParser.json());

// Database configuration
mongoose.connect('mongodb://localhost:27017/noteapp', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/users', userRoutes);
app.use('/api/notes', authMiddleware, noteRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
