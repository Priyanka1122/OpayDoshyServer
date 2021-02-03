const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeStamp = Date.now();

const StateList=new mongoose.Schema({
    state_id:{
        type: Number,
        required:true

    },
    state:{
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

module.exports = mongoose.model('stateList', StateList);