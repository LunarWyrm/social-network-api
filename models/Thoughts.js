const mongoose = require('mongoose');
const { Schema } = mongoose;


const { Schema } = mongoose;

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxLength: 280,
    },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleString()
  },
  username: {
    type: String,
    required: true,
  },
  reactions: {
    [reactionSchema]
  },
  {
    toJSON: { getters: true }
  }
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = { Thought, Reaction };
