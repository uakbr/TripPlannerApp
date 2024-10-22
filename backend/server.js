const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const tripRoutes = require('./routes/trip');
const dotenv = require('dotenv');
const feedbackRoutes = require('./routes/feedback');
const compression = require('compression');

dotenv.config();
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trip', tripRoutes);
app.use('/api/feedback', feedbackRoutes);

app.use(compression());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
