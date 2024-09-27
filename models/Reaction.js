const mongoose = require('mongoose');
const { Schema } = mongoose;

const reactionSchema = new Schema({
  reactionText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleString(),
  },
}, {
  toJSON: { getters: true },
  id: false,
});

const Reaction = mongoose.model('Reaction', reactionSchema);
module.exports = Reaction;