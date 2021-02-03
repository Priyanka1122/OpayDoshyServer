const mongoose = require('mongoose');
const timestamp = Date.now();

const Faqs = new mongoose.Schema({
    id:{
        type: Number,
        unique: true,
    },
    title:{
        type:String,
        required:false
},
faqs_description: {
        type: String,
        required: [false, `#Please provid the Faqs Description`],
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

module.exports = mongoose.model('faqs', Faqs)