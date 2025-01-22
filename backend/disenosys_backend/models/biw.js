const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

const questionBIWSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [optionSchema], required: true } 
});


const QuestionBIW = mongoose.model('BIWQuestion', questionBIWSchema);

module.exports = QuestionBIW;
