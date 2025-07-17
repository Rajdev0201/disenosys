
const Batch = require("../models/batch.js")

exports.createBatch =  async(req,res) => {
       const {batch,date,students,topic} = req.body;
       console.log(req.body)
    try{
       if(!batch || !date || !students ||!topic){
        return res.status(404).json({message:"please enter all fields"})
       }
      const data = new Batch({
        batch:batch,
        date:date,
        topic:topic,
        students:students
      })
      await data.save();
    return res.status(201).json({message:"Create a batch",data})
    }catch(err){
      console.log(err);
    }
}


exports.getBatch = async (req,res) => {
  console.log(req.query)
  const { batch } = req.query;
  console.log(batch)
  try{
     const data = await Batch.find({batch:batch});
     console.log(data)
     if(!data){
      return res.status(404).json({message:"not fetch the batch"})
     }
     return res.status(200).json({message:"received data",data})
  }catch(err){
    console.log(err)
  }
}


exports.getBatchName = async (req,res) => {
  try{
     const data = await Batch.find({},'batch');
     if(!data){
      return res.status(404).json({message:"not fetch the batch"})
     }
     return res.status(200).json({message:"received data",data})
  }catch(err){
    console.log(err)
  }
}