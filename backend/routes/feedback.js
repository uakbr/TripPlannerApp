const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/', async (req, res) => {
    const { feedback } = req.body;
    try {
        const newFeedback = new Feedback({ feedback });
        await newFeedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
