const mongoose = require("mongoose")

const batchSchema = new mongoose.Schema({
  batch: {
    type: String,
    required: true,
  },
   topic: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  students: [
    {
      name: String,
      sid: String,
      subrows: [
        {
          cname: String,
          start: String,
          end: String
        }
      ]
    }
  ],
}, { timestamps: true });


module.exports = mongoose.model("batch",batchSchema);