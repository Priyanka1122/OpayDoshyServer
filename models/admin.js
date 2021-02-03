const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema
const timestamp = Date.now()
const validator = require('validator');

const Admin = new mongoose.Schema({
    admin_name: {
        type: String,
        required: false, 
        trim: true,
        lowercase: true
    },

    admin_email: {
        type: String,
       // unique: true,
        required: [false, '#Please provide the email'],
        lowercase: true,
        validate(value) {
            //Validating the email
            if (!validator.isEmail(value)) {
                throw new Error('#Please provide the valid email address');
            }
        }
    },

    admin_phone: {
        type: String,
        required: [false, `#Please provide the Phone Number`],
        trim: true
    },

    password: {
        type: String,
        trim: true,
        required: [false, `#Please provide the password`],
        //minlength: [4, '#Min length required for password is 4'],
        //maxlength: [4, '#Max length required for password is 4'],

        // validate(value) {
        //     const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        //     if (value.includes('password')) { throw new Error(`#can't consist of value 'password' in it.`) }
        //     if (!strongRegex.test(value)) { throw new Error(`#Password must be including 1 upper case character, special character and alphanumeric.`) }
        // }
    },

    admin_address:{
        type: String,
        trim: true,
        required: false, 

    },

    admin_country:{
        type: String,
        trim: true,
        required: false, 

    },
    admin_state:{
        type: String,
        trim: true,
        required: false, 

    },

    admin_image:{
        type: String,
        trim: true,
        required: false, 

    },

    resetLink:{
        type: String,
        trim: true,
        required: false, 

    },
    email_check:{
        type: String,
        trim: true,
        required: false, 

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

module.exports = mongoose.model('admin', Admin)