const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Pass io from server.js for socket
let io;
const setSocket = (socketInstance) => {
  io = socketInstance;
};

// POST new feedback
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const feedback = new Feedback({ name, email, message });
    await feedback.save();

    // Emit new feedback to all clients
    if (io) io.emit('newFeedback', feedback);

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// GET all feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// DELETE feedback by ID
router.delete('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });

    // Emit delete to all clients
    if (io) io.emit('deleteFeedback', req.params.id);

    res.json({ message: 'Feedback deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

module.exports = { router, setSocket };
