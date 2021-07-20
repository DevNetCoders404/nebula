const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    //connecting db from mongoURI
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    //Exiting process due to error
    process.exit(1);
  }
};

module.exports = connectDB;
