const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const timestamp = Date.now();
//const { required } = require('joi');

const NotificationList=new mongoose.Schema({
    User_OID:{
        type: String,
        required: false,
    },
    auth_key:{
        type: String,
        required: false,

    },
    User_Name:{
        type:String,
        required:false 

    },
    User_Image:{
        type:String,
        required:false

    },
    title:{
        type:String,
        required:false
},
 Notification:{
        type:String,
        required:false,
    },

    createdAt: {
        type: Number,
        trim: true,
        default: timestamp
    },

    updatedAt: {
        type: Number,
        trim: true,
        default: timestamp
    }
})

module.exports = mongoose.model('notificationlist', NotificationList);