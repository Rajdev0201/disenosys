const mongoose = require("mongoose");


const consultAmount = new mongoose.Schema({
    name: { type: String ,required:true},   
    amt:{type:String,required:true},
}, { timestamps: true });

const ConsultAmt = mongoose.model("ConsultationAmount",consultAmount);
module.exports = ConsultAmt;