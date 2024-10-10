const express = require("express");
const PortfolioPage = require("../models/portfolio.js");
const router = express.Router();


router.get('/portfolio/single', async (req, res) => {
    // const { userId } = req.params;
  
    try {
      const portfolio = await PortfolioPage.find();
      if (!portfolio) {
        return res.status(404).json({ message: 'No portfolio found for this user.' });
      }
      return res.status(200).json(portfolio); 
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal server error');
    }
  });
  
  router.get('/portfolio', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const portfolios = await PortfolioPage.find();
      return res.status(200).json(portfolios);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal server error');
    }
  });


  module.exports = router;