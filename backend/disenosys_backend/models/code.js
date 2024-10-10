const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    userType: { type: String, required: true },
    expiresAt: { type: Date, },
    createdAt: { type: Date, default: Date.now },
    college: { type: String }
});

const Code = mongoose.model('Code', codeSchema);
module.exports = Code;
