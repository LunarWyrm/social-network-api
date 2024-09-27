const express = require('express');
const { Thought, User } = require('../../models');
const Reaction = require('../../models/Reaction');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);

    await User.findByIdAndUpdate(
      req.body.userId, 
      { $push: { thoughts: newThought._id } }, 
      { new: true }
    );

    res.status(201).json(newThought);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:thoughtId', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.status(204).json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/:thoughtId/reactions', async (req, res) => {
    try {
      const newReaction = await Reaction.create(req.body);
  
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: newReaction._id } },
        { new: true }
      );
  
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      res.json(updatedThought);
    } catch (err) {
      console.error('Error creating reaction:', err);
      res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  });

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
