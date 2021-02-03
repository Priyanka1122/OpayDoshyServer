const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const timestamp = Date.now()

const NewBill=new mongoose.Schema({
    User_OID:{
        type: String,
        required: false,
    },
    Bill_OID:{
        type:String,
        required:[false,`#Please provide the OID Number`]
 
    },
    User_Mobile: {
        type: String,
        required: [false, `#Please provide the Mobile Number`],
        trim: true
    },

    Biller_OID:{
        type:String,
        required: [false, `#Please provide the Biller OID`],
        
    },
    Bills_Name:{
        type:String,
        required:[false,`#Please Provide the Biller Name`],
        trim: true,

    },
    Biller_Bill_ID:{
        type:String,
        required:[false,`#Please Provide the Biller Bill ID`]
        
    },
    Bill_Amount:{
        type:String,
        required:[false,`#Please Provide the Bill Amount`]
    },

    Bill_Due_Date:{
        type:String,
        required:[false,`#Please Provide the Bill Due Date`]

    },

    Direct_Debit_Date:{
        type:String,
        required:[false,`#Please Provide the Bill Due Date`]

    },

    Direct_Debit_Amount:{
        type:String,
        required:[false,`#Please Provide the Bill Due Date`]
    },

    Link_Attachment:{
        type:String,
        required:[false,`#Please Provide the Link Attachment`]

    },
    Bpay_Biller_ID:{
        type:String,
        required:[false,`#Please Provide the BPay Biller ID`]

    },
    Bpay_Biller_CRN:{
        type:String,
        required:[false,`#Please Provide the Bpay Biller CRN`]
    },

    Bill_Status:{
        type: Boolean,
        required: false,
        default: false
    },
    Notes:{
        type:String,
        required:[false,`#Please Provide the Notes`]

    },
    Image:{
        type:String,
        required:[false,`#Please Provide the Image`]


    },
    Bills_File:{
        type:String,
        required:[false,`#Please Provide the Image`]
    },
    marks:{
        type:String,
        required:false

    },
    marks_date:{
        type: Number,
        trim: true,
        required:false

    },
    reverse_date:{
        type: Number,
        trim: true,
        required:false

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
    },
})

module.exports = mongoose.model('newbill', NewBill);

