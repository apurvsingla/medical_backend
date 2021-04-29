const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to database : MongoDb"));

db.once('open', function() {
    console.log('Connected to DataBase :: MongoDb');
})

module.exports = db;