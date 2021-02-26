const mongoose = require('mongoose');
const timestamp = Date.now();

const OnBordBiller = new mongoose.Schema({
    Biller_OID:{
        type:String,
        required:[false,`#Please provide the  Number`]

    },
    Biller_Name:{
        type:String,
        required:[false,`#Please provide the Biller Name`]
    },

    Biller_Entity_Legal_Name:{
        type:String,
        required:[false,`#Please provide the Biller Legal Name`]
    },
    Biller_ABN_ACN:{
        type:String,
        required:[false,`#Please provide the Biller ABN/ACN`]
    },
    Biller_Business_Address:{
        type:String,
        required:[false,`#Please provide the Biller Business Address`]
    },
    Biller_Postal_Address:{
        type:String,
        required:[false,`#Please provide the Biller Postal Address`]
    },
    BBC:{
        type:String,
        required:[false,`#Please provide the BBC`]
    },
    notes:{
        type:String,
    },

    Biller_Contact_Person:{
        type:String,
        required:[false,`#Please provide the Biller Contact Person`]
    },
    Biller_Contact_Number:{
        type:String,
        required:[false,`#Please provide the Biller Contact Number`]
    },
    Biller_Contact_Email:{
        type:String,
        required:[false,`#Please provide the Biller Contact Email`]
    },
    image:{
        type:String,
        required:[false,`#Please provid the Biller Image`]

    },
    createdAt: {
        type: Number,
        trim: true,
       // default: timestamp
    },
    updatedAt: {
        type: Number,
        trim: true,
       // default: timestamp
    }
}, {timestamps: true})

module.exports = mongoose.model('OnBordBiller', OnBordBiller);


