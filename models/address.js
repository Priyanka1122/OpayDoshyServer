const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeStamp = Date.now();

const NewAddressData=new mongoose.Schema({
    address_id:{
        type: Number,
        required:true

    },
    address:{
        type:String,
        required:true
    },

    createdAt: {
        type: Number,
        trim: true,
        default: timeStamp
    },
    updatedAt: {
        type: Number,
        trim: true,
        default: timeStamp
    },
    
})

module.exports = mongoose.model('newaddressdata', NewAddressData);


