const mongoose = require('mongoose');

const dbConnect = () => {
  const mongoDB = process.env.DB_URL;

  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  db.once('open', () => {
    console.log('MongoDB Connection Successful!');
  });
};

module.exports = dbConnect;
