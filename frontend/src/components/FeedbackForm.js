import React, { useState } from 'react';
import axios from 'axios';

function FeedbackForm() {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/feedback', { feedback });
            alert('Thank you for your feedback!');
            setFeedback('');
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Error submitting feedback');
        }
    };

    return (
        <div className="feedback-form card">
            <h2>We Value Your Feedback</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="feedback">Your Feedback</label>
                <textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Your feedback..."
                    rows="4"
                    required
                ></textarea>
                <button type="submit" aria-label="Submit Feedback">Submit</button>
            </form>
        </div>
    );
}

export default FeedbackForm;
