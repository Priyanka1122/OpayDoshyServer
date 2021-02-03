const mongoose = require('mongoose');
const timestamp = Date.now();

const termsCondition = new mongoose.Schema({
    id:{
        type: Number,
        unique: true,
    },
    title:{
        type:String,
        required:false
},
       condition: {
        type: String,
        required: [false, `#Please provid the term condition`],
        trim: true,
        lowercase: true
    },
    createdAt: {
        type: Number,
        required: false,
        default: timestamp
    },
    updatedAt: {
        type: Number,
        required: false,
        default: timestamp
    },


})

module.exports = mongoose.model('termsCondition', termsCondition)