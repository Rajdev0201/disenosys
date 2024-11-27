const express = require('express');
const Question = require('../models/quiz.js');
const catia = require('../models/catia.js');
const product = require('../models/product.js');
const router = express.Router();




router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});




router.get('/catia', async (req, res) => {
  try {
    const questions = await catia.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get('/product', async (req, res) => {
  try {
    const questions = await product.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});



router.post('/add', async (req, res) => {
  const { question, options } = req.body;

  try {
    const newQuestion = new Question({ question, options });
    await newQuestion.save();
    res.json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add question' });
  }
});

module.exports = router;
