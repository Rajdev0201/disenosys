const mongoose = require("mongoose");

const subrowSchema = new mongoose.Schema({
  cname: { type: String },
  start: { type: String },
  end: { type: String }
});

const onlineSchema = new mongoose.Schema(
  {
    fname: { type: String },     
    lname: { type: String }, 
    dob: { type: String }, 
    gender: { type: String }, 
    permanent: { type: String },
    communication: { type: String }, 
    no1: { type: String },
    no2: { type: String }, 
    emg: { type: String }, 
    email: { type: String }, 
    panno: { type: String }, 
    aadharno: { type: String }, 
    blood: { type: String }, 
    father: { type: String }, 
    mother: { type: String }, 
    marital: { type: String }, 
    spouse: { type: String }, 
    n1: { type: String }, 
    ndob: { type: String }, 
    nrealtion: { type: String }, 
    naddress: { type: String }, 
    bank: { type: String }, 
    branch: { type: String }, 
    Ac: { type: String }, 
    IFSC: { type: String }, 
    Edu: { type: String }, 
    Passed: { type: String }, 
    Academy: { type: String },
    isIndia: { type: String }, 
    idProof: { type: String },   
    profile: { type: String, default: null }, 
    file: { type: String, default: null }, 
    ten: { type: String, default: null }, 
    plustwo: { type: String, default: null }, 
    ug: { type: String, default: null }, 
    pg: { type: String, default: null }, 
    afile: { type: String, default: null }, 
    voter: { type: String, default: null }, 
    pan: { type: String, default: null }, 
    rdate: { type: String }, 
    cdate: { type: String }, 
    cname: { type: String }, 
    mode:{type:String},
    sid: { type: String }, 
    start:{type: String},
    end: { type: String }, 
    status: { type: String },
    subrows: [subrowSchema]
  }, 
  { timestamps: true }
);

const Online = mongoose.model("SAP", onlineSchema);
module.exports = Online;
