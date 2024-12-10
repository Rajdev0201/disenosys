const express = require("express");
const Blog = require("../models/blog");


const router = express.Router();



router.get('/data', async (req, res) => {

    try{
        const data = await Blog.find();
    
        if(!data){
              return res.status(400).json({ error: 'No Data is available' });
        }
    
        res.status(200).json({
            message: 'blog data get',
            data: data,
          });
        }catch(err){
            console.log(err);
            return res.status(500).json({err : "data is not fetched"})
        }
 
})

module.exports = router;
