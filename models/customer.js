const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema
const timestamp = Date.now()
const validator = require('validator');


const Customer = new mongoose.Schema({
user_OID:{
    type:String,
    default: 0,
    required:false

},
first_name: {
        type: String,
        required: [false, `#Please provid the 'First Name' `],
        trim: true,
        lowercase: true
    },
    middle_name:{
        type: String,
        required: [false, `#Please provid the Middle Name`],
        trim: true,
        lowercase: true

    },
    last_name: {
        type: String,
        required: [false, `#Please provid the Last Name`],
        trim: true,
        lowercase: true
    },
    mobile: {
        type: String,
        required: [false, `#Please provide the Mobile Number`],
        trim: true
    },

    email: {
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

    image:{
        type: String,
        trim: true,
        required: false, 

    },

    emailverified: {
        type: Boolean,
        required: false,
        default: false
    },


    address:{
        type: String,
        required: [false, `#Please provid the Address`],
        trim: true,
        lowercase: true

    },

    dob:{
        type: String,
        required: [false, `#Please provid the Dob`],
        trim: true,
        lowercase: true

    },

    licenceNumber:{
        type: Number,
        required: [false, `#Please provid the licenceNumber`],
        trim: true,
        lowercase: true

    },

    licenceState:{
        type: String,
        required: [false, `#Please provid the licenceState`],
        trim: true,
        lowercase: true

    },

    device_token:{
        type: String,
        required: [false, `#Please provid the device_token`],
        trim: true,
        lowercase: true

    },
  pin:{
        type: Number,
        required: false,
        trim: true,
        lowercase: true
 },
    device_token:{
        type: String,
        required: false,
        trim: true,
        lowercase: true

    },
   
    
    password: {
        type: String,
        trim: true,
        required: [false, `#Please provide the password`],
        minlength: [4, '#Min length required for password is 4'],
        maxlength: [4, '#Max length required for password is 4'],

        validate(value) {
            const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            if (value.includes('password')) { throw new Error(`#can't consist of value 'password' in it.`) }
            if (!strongRegex.test(value)) { throw new Error(`#Password must be including 1 upper case character, special character and alphanumeric.`) }
        }
    },
    
   
    verified: {
        type: Boolean,
        required: false,
        default: false
    },
    

    touch_status: {
        type: Boolean,
        required: false,
        default: false
    },

   notification_app_status:{
       type:Boolean,
       required:false,
       default: false,
},

 notification_sms_status:{
    type:Boolean,
    required:false,
    default: false,

 },
otp: {
        type: String,
        required: false,
    },

    auth_key:{
        type: String,
        required: false,

    },

    verificationLink:{
        type: String,
        required: false,

    },
  account_status: {
        type: Boolean,
        required: false,
        default: true
    },

    user_status:{
        type:Boolean,
        required:false,
        default:false

    },
    account_type:{
        type: String,
        required: false,
},
  active_status:{
    type:String,
    required:false,
    default:"1"
},
text_notifications:{
    type:Boolean,
    required:false,
    default:false
},
 user_verified:{
    type:Boolean,
    required:false,
    default:false

 },

 notification_on_time:{
    type: Number,
    required: false,
    default: timestamp

 },
 
 notification_off_time:{
    type: Number,
    required: false,
    default: timestamp

 },

 app_notification_enable_time:{
    type: Number,
    required: false,
    default: timestamp
     

 },

 app_notification_disbale_time:{
    type: Number,
    required: false,
    default: timestamp
     

 },

    createdAt: {
        type: Number,
        required: false,
        //default: timestamp
    },
    updatedAt: {
        type: Number,
        required: false,
        //default: timestamp
    },
   
})




//Hashing before saving - this code is executed before saving the data in to the databaase
Customer.pre('save', async function (next) {
    const user = this;

    // Hashing the otp before saving to the database
    if (user.isModified('otp')) {
        user.otp = await bcrypt.hash(user.otp, 8);
    }
   next();
})

module.exports = mongoose.model('User', Customer)

