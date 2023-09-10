const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  coursename: String,
  price: Number,
  buyer_name: String,
  redirect_url: String,
  email: String,
  phone: String,
  timestamp: { type: Date, default: Date.now },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
