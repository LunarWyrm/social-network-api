const mongoose = require('mongoose');
const Reaction = require('../models/Reaction');
const Thought = require('../models/Thoughts');

const seedData = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/studentsDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 20000,
    });
    console.log('MongoDB connected successfully.');

    await Reaction.deleteMany({});
    await Thought.deleteMany({});

    const reactions = await Reaction.insertMany([
      {
        reactionText: 'This is a sample reaction',
        username: 'user123'
      },
      {
        reactionText: 'Another reaction for testing',
        username: 'user456'
      }
    ]);

    console.log('Reactions seeded:', reactions);

    await Thought.insertMany([
      {
        thoughtText: 'This is a sample thought',
        username: 'user123',
        reactions: [reactions[0]._id]
      },
      {
        thoughtText: 'Another thought with a reaction',
        username: 'user456',
        reactions: [reactions[1]._id]
      }
    ]);

    console.log('Thoughts seeded');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

seedData();
