const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/studentsDB';

connect(connectionString, {
    serverSelectionTimeoutMS: 20000,
})
    .then(() => {
        console.log('MongoDB connected successfully.');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

module.exports = connection;
