const mongoose = require("mongoose");


const consultAmount = new mongoose.Schema({
    name: { type: String ,required:true},   
    amt:{type:String,required:true},
}, { timestamps: true });

module.exports = mongoose.model("ConsultationAmount",consultAmount);
