const mongoose = require('mongoose');
const timestamp = Date.now();

const Contactus = new mongoose.Schema({
    id:{
        type: Number,
        unique: true,
    },
    title:{
        type:String,
        required:false
},
    name: {
        type: String,
        required: [false, `#Please provid the name`],
        trim: true,
        lowercase: true
    },
    contact_number: {
        type: String,
        required: [false, `#Please provid the contact number`],
        trim: true,
        lowercase: true
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

module.exports = mongoose.model('Contactus', Contactus)