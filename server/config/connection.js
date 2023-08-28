const mongoose = require('mongoose');
require('dotenv').config();

//NOTE - From example in class
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/freshstart');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mazemania');

module.exports = mongoose.connection;
