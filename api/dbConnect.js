const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL2);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.log('Connection to MongoDB Failed!');
    console.error(error);
  }
}

module.exports = dbConnect;