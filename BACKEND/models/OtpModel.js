const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true, // Store the hashed password
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    expires: 0,
  },
});

module.exports = mongoose.model("Otp", otpSchema);