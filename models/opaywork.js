const mongoose = require('mongoose');
const timestamp = Date.now();

const Opaywork = new mongoose.Schema({
    id:{
        type: Number,
        unique: true,
    },
    title:{
        type:String,
        required:false
},
    description: {
        type: String,
        required: [false, `#Please provid the Description`],
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

module.exports = mongoose.model('opaywork', Opaywork)