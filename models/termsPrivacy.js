const mongoose = require('mongoose');
const timestamp = Date.now();

const termaPrivacy = new mongoose.Schema({
    id:{
        type: Number,
        unique: true,
    },
    title:{
        type:String,
        required:false
},
       privacy: {
        type: String,
        required: [false, `#Please provid the privacy`],
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

module.exports = mongoose.model('termaPrivacy', termaPrivacy)