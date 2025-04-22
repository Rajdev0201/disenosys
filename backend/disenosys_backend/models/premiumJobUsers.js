const mongoose = require("mongoose");

const premiumUserJobs = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
  },
  portfolio: {
    type: String,
  },
  qualification: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  yearOfPassing: {
    type: Number,
    required: true,
  },
  currentJob: {
    type: String,
  },
  experience: {
    type: String,
    required: true,
  },
  previousCompany: {
    type: String,
  },
  currentCTC: {
    type: String,
  },
  expectedCTC: {
    type: String,
  },
  noticePeriod: {
    type: String,
  },
  preferredLocation: {
    type: String,
  },
  resume: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  native: {
    type: String,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("premiumJobList", premiumUserJobs);

  