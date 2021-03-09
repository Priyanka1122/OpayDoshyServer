const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { required } = require('joi');
const Customer = require("../../models/customer");
const OpayWork =require("../../models/opaywork");
const Faqs=require("../../models/faqs");
const Contactus=require("../../models/contactus");
const termsPrivacy=require("../../models/termsPrivacy");
const AddressModule=require("../../models/address");  
const StateList=require("../../models/statelist");

const Notificationlist=require("../../models/notificationlist");

//------------

//-------------------------
const Validation = require("../validations/index");
const Validationdata = require("../validations/isOpayValidate");
const generateRandomNumber = require('../../logic/random_number') // function to generate the random number for otp purpose
const passwordSecure = require('../../logic/passwordValidaton');
const hashAnyThing = require('../../logic/hashConversion'); 
const generate_auth_key = require('../../logic/generate_auth_key'); 
 



const { constant, statusCodes } = require("../../constant");
const validator = require('validator');
const messages = require("../../messages").messages.MESSAGES;
const shortcode = require('shortid');
const sendTwilioMsg = require('../../logic/twilio_sms');
const sendEmail = require('../../logic/send_email') //function to send the email

const bcrypt = require('bcryptjs') // Npm included to encrypt the password and otp
var crypto = require('crypto');
let auth_create = crypto.randomBytes(30).toString('hex');
const timestamp = Date.now();
const fs = require('fs');
  //changesPin
exports.addUser = addUser;
exports.verify_otp=VerifyOtp;
exports.updateDetails=updateDetails;
exports.pinSetting=pinSetting;
exports.getProfile=getProfile;
exports.sendmail=sendmail;
exports.mailverification=mailverification;
exports.changesPin=changesPin;
exports.touchStatus=touchStatus;
exports.notification_app_status=notification_app_status;
exports.notification_sms_status=notification_sms_status;
exports.myDetails=myDetails;
exports.update_mobile=update_mobile;
exports.opaywork=opaywork;
exports.Faqsdata=Faqsdata;
exports.contactus=contactus;
exports.termsPrivacy=termsPrivacydata;
exports.delete_user=delete_user;
exports.address_data=address_data;
exports.statelist=statelist;
exports.logindata=logindata;
exports.notificationlist=notificationlist;
exports.touch_status=touch_status;

//--------------------------------------------

// var n = "UR00000001";
// var r = n.replace(/(\d+)/, (match)=>("0".repeat(8)+(++match)).substr(-8));
// console.log(r);
  
 //------------------------------------------

async function addUser(req, res, next) {
 try {
      const { mobile } = req.body;
      const {device_token} =req.body;

      const { security_key } = req.headers;
     if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
     if (security_key != "OPAY@123") {
        message = "Invalid security key";
        res.status(403).json({'success': false, 'msg': message, 'code': 403,'body': [] });
        res.end();
        return false;
    }
       if (mobile === undefined || mobile === null || mobile === "") return res.json({ status: false, msg: 'Please provide the mobile number.' })

       var checkmobile = (validator.isMobilePhone(mobile) && mobile.length ==8);
         if(!checkmobile){
           res.json({success:404, "message" : "Invalid Mobile Numbar"});
             return false;
         }
      db = Customer
      query = db.find({ mobile: mobile })
     query.exec(async (err, data) => {
         
        const randomeNumber = generateRandomNumber();

        //const randomeNumber = 1111
        console.log(randomeNumber)
    if (err) {
          console.log(err); return res.status(500).send({ status: false, msg: 'Something went wrong' })
        }
        if (data) {

          let user = await Customer.findOne({ mobile: mobile});

         if(user){
          if (user.user_status === true) {
            return res.status(200).send({ status: false, msg: 'User already exist.', code: 2 })
          }
          else if(user.user_status === false){


           var otpdata=await bcrypt.hash(user.otp, 8);
            Customer.updateMany({auth_key:user.auth_key}, {
              otp:otpdata, 
            //  updatedAt: timestamp,
              
           }, function(err, affected, resp) {
             var body = 'Your Verification code for Opay registration is ' + randomeNumber + '.';
             mobile1="+91"+mobile
            //  sendTwilioMsg(body, mobile1); //OTP NOTIFICATION ON MOBILE NUMBER
             return res.status(200).send({ status: true, data: user });
           })


          }
        }
          else {

          
            let user1 = await Customer.find({}).sort({_id:-1}).limit(1);
           
            if(user1.length>0){
            var text = user1[0].user_OID;
            var n =text;
          var data = n.replace(/(\d+)/, (match)=>("0".repeat(8)+(++match)).substr(-8));
            }
            else{
              var data="UR00000001"
            }
            let auth_create1 = crypto.randomBytes(30).toString('hex');
          const customer = new Customer({
             user_OID:data,
               mobile: mobile,
               otp:randomeNumber,
               auth_key:auth_create1,
               device_token:device_token,
               account_type:"N",
               createdAt: timestamp,
              //  
             })
       customer.save((err) => {
        if (err) {
                console.log(err);
                const ErrorMessage = substringFunction(err.toString(), '#', 'b') 
                return res.status(500).send({ status: false, msg: `${ErrorMessage}` })
              }
              else {
                var body = 'Your Verification code for Opay registration is ' + randomeNumber + '.';
                mobile1="+61"+mobile

               //---------------------------------------------
               const express = require('express');
              const app = express();
               require('dotenv').config();

             var AWS = require('aws-sdk');

function sendOTP(){
    var mobileNo =mobile1;
    var OTP = 1111;
    
    var params = {
    Message: "Welcome! your mobile verification code is: " + OTP  ,
  
      PhoneNumber: mobileNo,
      };
      return new AWS.SNS({apiVersion: '2010–03–31'}).publish(params).promise()
 .then(message => {
    console.log("OTP SEND SUCCESS");
 })
 .catch(err => {
 console.log("Error "+err)
 return err;});
 }
 sendOTP();
 //  sendTwilioMsg(body, mobile1); //OTP NOTIFICATION ON MOBILE NUMBER
                return res.status(200).send({ status: true, data: customer })
              }
          })
          }
        }
      })
  
    }
    catch (err) {
      return res.status(401).send({ status: false, msg: 'Unauthorized' })
    }
  }

   async function VerifyOtp(req,res,next) {
     console.log("check user exist: AUTH KEY");
     console.log(req.headers.auth_key);
    try {
    const { auth_key } = req.headers;
    const { otp } = req.body;
    const { security_key } = req.headers;
    if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
    if (security_key != "OPAY@123") {
       message = "Invalid security key";
       res.status(403).json({'success': false, 'msg': message, 'code': 403,'body': [] });
       res.end();
       return false;
   }
    if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' })

    //User validation.
   let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User
   if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.` })

   if(user){
    if(user.account_status === false){
      var accountStatus="B"
    }
    else if(user.verified === false){
      var accountStatus="N"
    }
    else if(user.verified === true){
      var accountStatus="O"
    }
   }



 if (otp === undefined || otp === null || otp === "") return res.json({ status: false, msg: 'Please provide the otp number.' })
  customer = Customer
  
  const isMatch=otp==1111;

  //const isMatch = await bcrypt.compare(otp.toString(), user.otp); // Matching the OTP with the saved one in the database.
    if (!isMatch) return res.json({ status: false, msg: `OTP doesn't match. Please enter the correct OTP.` });
    if(isMatch){
      customer.updateOne({auth_key: auth_key}, {
                    verified:true
                }, function(err, affected, resp) {
                   console.log(resp);
                })
            data1={
                        "is_verify": 1,
                        "accountStatus":accountStatus
                   }
                return res.send({ msg: 'OTP matched', status: true , data: data1})
}

}
catch (err) {
  return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
}

      
  }

 async function  updateDetails(req,res,next) {
     try{

    const { security_key } = req.headers;
    if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
    if (security_key != "OPAY@123") {
       message = "Invalid security key";
       res.status(403).json({'success': false, 'msg': message, 'code': 403,'body': [] });
       res.end();
       return false;
   }

   const { auth_key } = req.headers;

   if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' })

   //User validation.
   let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User 
   if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.` })

   let { first_name, middle_name, last_name,address,dob } = req.body;

   if (first_name === undefined || first_name === null || first_name === "") return res.json({ status: false, msg: 'Please provide the first name.' });
   var checkname = validator.isAlpha(first_name);
    if(!checkname) return res.json({status:false,msg:'Invalid First Name'});
 

   if (last_name === undefined || last_name === null || last_name === "") return res.json({ status: false, msg: 'Please provide the last name.' });

   var checkname1 = validator.isAlpha(last_name);
    if(!checkname1) return res.json({status:false,msg:'Invalid Last Name'});

  //  if (address === undefined ||address === null || address === "") return res.json({ status: false, msg: 'Please provide the address.' });
   if (dob === undefined ||dob === null || dob === "") return res.json({ status: false, msg: 'Please provide the dob.' });

  // if (licenceState === undefined ||licenceState === null || licenceState === "") return res.json({ status: false, msg: 'Please provide the licenceState.' });

   //if (licenceNumber  === undefined ||licenceNumber  === null || licenceNumber  === "") return res.json({ status: false, msg: 'Please provide the licenceNumber.' });
   customer = Customer
   customer.updateMany({auth_key: auth_key}, {
    first_name:first_name,
    middle_name:middle_name,
    last_name:last_name,
    address:address,
    dob:dob,
    updatedAt: timestamp,
   // licenceState:licenceState,
   // licenceNumber:licenceNumber
    
}, function(err, affected, resp) {
   console.log(resp);
})

customer.findOne({ auth_key: auth_key }, (err, data) => {

    if (!err) {
      return res.send({ status: true,msg: 'Details Update Successfully.', data: data })
    }
    else {
      return res.send({ msg: 'Data not found', status: true })
    }
  })
}

    
    catch (err) {
      return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
    }

 }

 async function  pinSetting(req,res,next) {
    try{

        const { security_key } = req.headers;
    if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
    if (security_key != "OPAY@123") {
       message = "Invalid security key";
       res.status(403).json({'success': false, 'msg': message, 'code': 403,'body': [] });
       res.end();
       return false;
   }

   const { auth_key } = req.headers;

   if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' })

   let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User 
   if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.` })

   let { pin,device_token } = req.body;

   if (pin === undefined || pin === null || pin === "") return res.json({ status: false, msg: 'Please provide the PIN Number.' })
   customer = Customer
   customer.updateOne({auth_key: auth_key}, {
    pin:pin,
    device_token:device_token,
    user_status:true,
    account_type: "O",
  
    
}, function(err, affected, resp) {
   console.log(resp);
})
//-------------------------


const FCM = require('fcm-node');

 var serverKey='AAAA0YNs_0U:APA91bGv9e0tfAIm9PhMG-bfjzOvFivXFEemBQb9Tz7SoKqyctWN-AGp0mGnDoHGPQg2vmx2ubUCXSAaELzQ_7bVxGoLpLe06haVq9avG2c0oCYUNBSCXWX2hb58pvslMWC_ihBve7bW';
 var fcm = new FCM(serverKey);
 
var device_token1=device_token;
 //var device_token='eFuqCvxxSTusTYdltlIRN8:APA91bFEl_b53nY5J0RJYNQuupj3iIUuXjpkH8IGuF_pf5WyueIz36R-RdZL16AkjczdUy7o_VVHoftDZSHZYUdYuSLz8WyIb0BU9Eca68OP4Srp99YEQr_1zLMksaUvgZY7NIOhiN7B'
 var title = 'Doshy'
var get_message="Welcome to Opay! We’re excited to help you make managing your bills a lot less painful:)" 

 var message = { 
   to: device_token1,
  notification: {
     title: title,
   body: get_message,
    },
data: {  
    body: get_message,
   }
 };

 fcm.send(message, function (err, response) {
   if (err) {
    console.log("Something has gone wrong!", message);
  } else {
    console.log("Successfully sent with response: ", response);
  }
});

//------------------------------


const notificationlist = new Notificationlist({
  User_OID:user.user_OID,
  auth_key:user.auth_key,
  User_Name:user.first_name,
  User_Image:"image-1607327075.jpg",
  title:title,
  Notification:get_message,
 
  })

notificationlist.save((err) => {
if (err) {
     console.log(err);
     const ErrorMessage = substringFunction(err.toString(), '#', 'b') 
     return res.status(500).send({ status: false, msg: `${ErrorMessage}` })
   }
   else {
     console.log("successfully")
   
   }
})




//----------------------------

customer.findOne({ auth_key: auth_key }, (err, data) => {

    if (!err) {
      return res.send({ status: true,msg: 'PIN setup successfully', data: data })
    }
    else {
      return res.send({ msg: 'Data not found', status: true })
    }
  })

}
    catch (err) {
        return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
      }

     
 }

 async function getProfile(req,res,next) {
     try{
    const { security_key } = req.headers;
    if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
    if (security_key != "OPAY@123") {
       message = "Invalid security key";
       res.status(403).json({'success': false, 'msg': message, 'code': 403,'body': [] });
       res.end();
       return false;
   }

   const { auth_key } = req.headers;

   if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' })
   let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User 
   if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.` })
   customer = Customer
   customer.findOne({ auth_key: auth_key }, (err, data) => {
 if (!err) {
        return res.send({status: true , msg: 'User Profile', data: data })
      }
      else {
        return res.send({ status: true,msg: 'Data not found' })
      }
    })

}
catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }
     
 }

 async function  sendmail(req,res,next) {
   try{
    const { auth_key, security_key } = req.headers;
    const { email } = req.body;
    
    if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
    if (security_key != "OPAY@123") {
       message = "Invalid security key";
       res.status(403).json({'success': false, 'msg': message, 'code': 403,'body': [] });
       res.end();
       return false;
   }
    if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' })

    //User validation.
   let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User
   if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.` })



    if (email === undefined || email === null || email === "") return res.json({ status: false, msg: 'Please provide the email .' })

    let emailcheck =await Customer.findOne({email:email})
    if(emailcheck){
     return res.status(401).send({ status: false, msg: 'Email already exists.' })
 }
    customer = Customer
    customer.updateOne({auth_key: auth_key}, { email:email,}, function(err, affected, resp) {
    console.log(resp);
 })
 
 email1=email

 emailverified=user.emailverified
 sendEmail(email1,emailverified,auth_key);
 return res.json({ status: true, msg: 'mail verification link has been send to your E-mail.', type: 'confirmation' });


   }
   catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }
   
 }

 //-------Mail Verfication-------------------

 async function  mailverification(req,res,next) {
   try{
  const verificationLink = req.params.verificationLink;

  let user = await Customer.findOne({ verificationLink: verificationLink});
   
   if (user.emailverified == false) {
    fs.readFile("./logic/verfication.html", function (error, data) {
      customer = Customer
    customer.updateOne({verificationLink: verificationLink}, { emailverified:true}, function(err, affected, resp) {
    //console.log(resp);
    })
   if (error) {
        console.log(error);
        res.writeHead(404);
        res.write('Contents you are looking are Not Found');
      } else {
        res.write(data);
      }
      res.end();
    });

  }
  else {
    fs.readFile("./logic/alreadyverfication.html", function (error, data) {
     
   if (error) {
        console.log(error);
        res.writeHead(404);
        res.write('Contents you are looking are Not Found');
      } else {
        res.write(data);
      }
      res.end();
    });

  }

}
catch (err) {
 return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
}


   
 }

 async function changesPin(req,res,next) {
   try{
    const { security_key,auth_key} = req.headers;
    const { current_pin,new_pin } = req.body; 
    if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
    if (security_key != "OPAY@123") { message = "Invalid security key";
        res.status(403).json({'success': false,'code': 403,'msg': message, });
       res.end();
       return false;
   }
   if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' });
let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User
   if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.`});

   if (current_pin === undefined || current_pin === null || current_pin === "") return res.json({ status: false, msg: 'Please provide the current pin.' });

   
   if(user.pin.toString() !== current_pin) return res.json({status:false ,msg:`Current PIN entered is incorrect`});

   if (new_pin === undefined || new_pin === null || new_pin === "") return res.json({ status: false, msg: 'Please provide the new pin.'});

   customer = Customer
   customer.updateOne({auth_key: auth_key}, { pin:new_pin,}, function(err, affected, resp) {
   
})

return res.send({status: true , msg: 'New PIN saved.' })

}
   catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }
   
   
 }

 async function touchStatus(req,res,next) {
   try{

    const { security_key,auth_key} = req.headers;
    const {  touch_status } = req.body; 
    if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
    if (security_key != "OPAY@123") { message = "Invalid security key";
        res.status(403).json({'success': false,'code': 403,'msg': message, });
       res.end();
       return false;
   }
   if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' });
let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User
   if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.`});

   if (touch_status === undefined || touch_status === null || touch_status === "") return res.json({ status: false, msg: 'Please provide the touch status.' });

  
   
   customer = Customer
  customer.updateMany({auth_key: auth_key}, { touch_status:touch_status}, function(err, affected, resp) {
  
})

if(touch_status ==="0"){
 data1={
    "touch_status":false
 }
return res.send({status: true, msg: 'Touch Status Disable' , data: data1})

}
else{ 
  data1={
    "touch_status":true
 }
return res.send({status: true, msg: 'Touch Status Enable' , data: data1})
}

   } catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }

   
 }

 async function notification_app_status(req,res,next) {
  try{

   const { security_key,auth_key} = req.headers;
   const {  notification_app_status } = req.body; 
   if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
   if (security_key != "OPAY@123") { message = "Invalid security key";
       res.status(403).json({'success': false,'code': 403,'msg': message, });
      res.end();
      return false;
  }
  if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' });
let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User
  if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.`});

  if (notification_app_status === undefined || notification_app_status === null || notification_app_status === "") return res.json({ status: false, msg: 'Please provide the notification app status.' });

  

  
  customer = Customer
 customer.updateMany({auth_key: auth_key}, { notification_app_status:notification_app_status}, function(err, affected, resp) {
 
})

if(notification_app_status ==="0"){
data1={
   "notification_app_status":false
}
return res.send({status: true, msg: 'Notification App Status Disable' , data: data1})

}
else{ 
 data1={
   "notification_app_status":true
}
return res.send({status: true, msg: 'Notification App Status Enable' , data: data1})
}

  } catch (err) {
   return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
 }

  
}

async function notification_sms_status(req,res,next) {
  try{

   const { security_key,auth_key} = req.headers;
   const {  notification_sms_status } = req.body; 
   if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
   if (security_key != "OPAY@123") { message = "Invalid security key";
       res.status(403).json({'success': false,'code': 403,'msg': message, });
      res.end();
      return false;
  }
  if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' });
let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User
  if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.`});

  if (notification_sms_status === undefined || notification_sms_status === null || notification_sms_status === "") return res.json({ status: false, msg: 'Please provide the notification sms status.' });

  

  
  customer = Customer
 customer.updateMany({auth_key: auth_key}, { notification_sms_status:notification_sms_status}, function(err, affected, resp) {
 
})

if(notification_sms_status ==="0"){
data1={
   "notification_sms_status":false
}
return res.send({status: true, msg: 'Notification SMS Status Disable' , data: data1})

}
else{ 
 data1={
   "notification_sms_status":true
}
return res.send({status: true, msg: 'Notification SMS Status Enable' , data: data1})
}

  } catch (err) {
   return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
 }

  
}

async function myDetails(req,res,next) {
  try{
  const { security_key,auth_key} = req.headers;
  const {  first_name, middle_name, last_name,address,email } = req.body; 
  if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
  if (security_key != "OPAY@123") { message = "Invalid security key";
      res.status(403).json({'success': false,'code': 403,'msg': message, });
     res.end();
     return false;
 }
 if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' });
let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User
 if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.`});

 if (first_name === undefined || first_name === null || first_name === ""){
 var first_name1=user.first_name;
 }
 else{
var first_name1=first_name;
 }

if (middle_name === undefined || middle_name === null || middle_name === ""){
  var middle_name1=user.middle_name;
  }
  else{
 var middle_name1=middle_name;
  }

if (last_name === undefined || last_name === null || last_name === ""){
var last_name1=user.last_name;
 }
else{
var last_name1=last_name;
 }

// if (mobile === undefined || mobile === null || mobile === ""){
// var mobile=user.mobile;
//  }
//  else{
// var mobile=mobile;
// mobile1="+91"+mobile //mobile verification
// sendTwilioMsg(body, mobile1);
// }
  if (address === undefined || address === null || address === ""){
  var address1=user.address;
  }
 else{
  var address1=address;
  }
  if (email === undefined || email === null || email === ""){
 var email1=user.email;
 var emailverified1=user.emailverified;
  }
else{
 var email1=email;
 var emailverified1=false;

 emailverified=user.emailverified1
 sendEmail(email1,emailverified,auth_key);
  } 

  customer = Customer

  customer.updateMany({auth_key: auth_key}, {
   first_name:first_name1,
   middle_name:middle_name1,
   last_name:last_name1,
   address:address1,
   email:email1,
   emailverified:emailverified1,
   updatedAt: timestamp
   
}, function(err, affected, resp) {
  //console.log(resp);
})

customer.findOne({ auth_key: auth_key }, (err, data) => {

   if (!err) {
     return res.send({ status: true,msg: 'Details updated Successfully.', data: data })
   }
   else {
     return res.send({ status: true,msg: 'Data not found' })
   }
 })


} catch (err) {
  return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
}



}

async function update_mobile(req,res,next) {
try{
  const { security_key,auth_key} = req.headers;
  const {  mobile } = req.body; 
  if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
  if (security_key != "OPAY@123") { message = "Invalid security key";
      res.status(403).json({'success': false,'code': 403,'msg': message, });
     res.end();
     return false;
 }
 if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' });
let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User
 if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.`});
  if (mobile === undefined || mobile === null || mobile === "") return res.json({ status: false, msg: 'Please provide the mobile number.' });

  var checkmobile = (validator.isMobilePhone(mobile) && mobile.length ==10);
  if(!checkmobile){
    res.json({success:404, "message" : "Invalid Mobile Numbar"});
      return false;
  }
if (mobile === undefined || mobile === null || mobile === ""){
  var mobile1=user.mobile;
  var verified1=user.verified

}


else if(user.mobile === mobile){
  return res.json({ status: false, msg: 'Mobile number already used.' });

}
else{
  var mobile2=mobile;
  var verified1=false;

}
const randomeNumber = generateRandomNumber();
var body = 'Your Verification code for Opay registration is ' + randomeNumber + '.';
mobile1="+91"+mobile
sendTwilioMsg(body, mobile1);

customer = Customer
customer.updateMany({auth_key: auth_key}, {
  mobile:mobile2,
  verified:verified1,
}, function(err, affected, resp) {

})

customer.findOne({ auth_key: auth_key }, (err, data) => {

  if (!err) {
    return res.send({ status: true,msg: 'Mobile number updated Successfully.', data: data })
  }
  else {
    return res.send({ status: true,msg: 'Data not found' })
  }
})
} catch (err) {
  return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
}
}

async function  resend_code(req,res,next) {
  try{
  const { security_key,auth_key} = req.headers;
 if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
  if (security_key != "OPAY@123") { message = "Invalid security key";
      res.status(403).json({'success': false,'code': 403,'msg': message, });
     res.end();
     return false;
 }
 if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' });
let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User
 if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.`});

 const randomeNumber = generateRandomNumber();
var body = 'Your Verification code for Opay registration is ' + randomeNumber + '.';
mobile1="+91"+mobile
sendTwilioMsg(body, mobile1);

return res.send({ status: true,msg: 'code resent successfully.'});
} catch (err) {
  return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
}

}

async function  opaywork(req,res,next) {
  const { security_key,auth_key} = req.headers;
  if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
   if (security_key != "OPAY@123") { message = "Invalid security key";
       res.status(403).json({'success': false,'code': 403,'msg': message, });
      res.end();
      return false;
  }
  if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' });
 let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User
  if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.`});

  OpayWork.findOne((err, data) => {
if (!err) {
    return res.send({ status: true,msg: 'Opay Works.', data: data })
  }
  else {
    return res.send({ status: true,msg: 'Data not found' })
  }
})


  
}

async function  Faqsdata(req,res,next) {
  try{
  const { security_key,auth_key} = req.headers;
  if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
   if (security_key != "OPAY@123") { message = "Invalid security key";
       res.status(403).json({'success': false,'code': 403,'msg': message, });
      res.end();
      return false;
  }
  if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' });
 let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User
  if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.`});

  Faqs.findOne((err, data) => {
if (!err) {
    return res.send({ status: true,msg: 'Faqs.', data: data })
  }
  else {
    return res.send({ status: true,msg: 'Data not found' })
   }
 })

} catch (err) {
  return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
}


  
}

async function  contactus(req,res,next) {
try{

  const { security_key,auth_key} = req.headers;
  if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
   if (security_key != "OPAY@123") { message = "Invalid security key";
       res.status(403).json({'success': false,'code': 403,'msg': message, });
      res.end();
      return false;
  }
  if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' });
 let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User
  if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.`});

  Contactus.findOne((err, data) => {
    if (!err) {
      
        return res.send({ status: true,msg: 'Contactus Data.', data: data })
      }
      else {
        return res.send({ status: true,msg: 'Data not found' })
      }
    })
  } catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }


}

async function  termsPrivacydata(req,res,next) {
  try{
  const { security_key} = req.headers;
  if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
   if (security_key != "OPAY@123") { message = "Invalid security key";
       res.status(403).json({'success': false,'code': 403,'msg': message });
      res.end();
      return false;
  }

 //let requestdata = await Validationdata.vaildObject(security_key, auth_key,res);

  
  //if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' });
//  let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User
//   if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.`});

  termsPrivacy.findOne((err, data) => {
    if (!err) {
      
        return res.send({ status: true,msg: 'Terms Privacy.', data: data })
      }
      else {
        return res.send({ status: true,msg: 'Data not found' })
      }
    })

  } catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }

  
}

async function  delete_user(req,res,next) {
  try{
    const { security_key,auth_key} = req.headers;
    if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
     if (security_key != "OPAY@123") { message = "Invalid security key";
         res.status(403).json({'success': false,'code': 403,'msg': message, });
        res.end();
        return false;
    }
    if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' });
   let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User
    if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.`});

    customer = Customer
   customer.deleteOne({auth_key: auth_key} ,function(err, affected, resp) {
   
})

return res.send({status: true , msg: 'Account Delete Successfully.' })


  }
  catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }
  
}


async function  address_data(req,res,next) {
  try{

  const { security_key,auth_key} = req.headers;
  if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
   if (security_key != "OPAY@123") { message = "Invalid security key";
       res.status(403).json({'success': false,'code': 403,'msg': message, });
      res.end();
      return false;
  }
  if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' });
 let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User
  if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.`});

  
 AddressModule.find((err, data) => {
    if (!err) {
      
        return res.send({ status: true,msg: 'All Address List.', data: data })
      }
      else {
        return res.send({ status: true,msg: 'Data not found' })
      }
    })

  }
  catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }


  
}

async function  statelist(req,res,next) {
  try{
    const { security_key,auth_key} = req.headers;
    if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
     if (security_key != "OPAY@123") { message = "Invalid security key";
         res.status(403).json({'success': false,'code': 403,'msg': message, });
        res.end();
        return false;
    }
    if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' });
   let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User
    if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.`});

StateList.find((err, data) => {
      if (!err) {
        
          return res.send({ status: true,msg: 'All State List.', data: data })
        }
        else {
          return res.send({ status: true,msg: 'Data not found' })
        }
      })

  }
  catch(err){
    return res.status(401).send({ status:false, msg: 'Something Went Wrong.Please Try Again!'})
  }

  
}


async function logindata(req,res,next) {
try{
    const { security_key,auth_key} = req.headers;
    const {pin,device_token } = req.body; 
    if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
     if (security_key != "OPAY@123") { message = "Invalid security key";
         res.status(403).json({'success': false,'code': 403,'msg': message, });
        res.end();
        return false;
    }
    if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' });
   let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User
    if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.`});

    if (pin === undefined || pin === null || pin === "") return res.json({ status: false, msg: 'Please provide the  pin.' });

    //if (device_token === undefined || device_token === null || device_token === "") return res.json({ status: false, msg: 'Please provide the  pin.' });
    if(user.pin ==pin){

      Customer.updateOne({auth_key: auth_key}, {
        device_token:device_token
    }, function(err, affected, resp) {
       console.log(resp);
    })

      return res.send({ status: true,msg: 'Login Successful.', data: user })

    }
    else{

     return res.send({ status: true,msg: 'Invalid pin number.'})
    }
    


  }

  catch (err) {
    return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
  }
  
}

async function notificationlist(req,res,next) {
  try{
    const { security_key,auth_key} = req.headers;
    if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
     if (security_key != "OPAY@123") { message = "Invalid security key";
         res.status(403).json({'success': false,'code': 403,'msg': message, });
        res.end();
        return false;
    }
    if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' });
   let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User
    if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.`});

    let notificationdata=await Notificationlist.find({ auth_key: auth_key});
 

    if(notificationdata){
      return res.send({ status: true,msg: 'Notification Data List.', data: notificationdata });
    }
    else{
      data=[]
      return res.send({ status: true,msg: 'Data not found',data:data });
    }

    // Notificationlist.find((err,data)=> {
    //   if (!err) {
    //      return res.send({ status: true,msg: 'Notification Data List.', data: data })
    //     }
    //     else {
    //       return res.send({ status: true,msg: 'Data not found' })
    //     }
    //   })
}
  catch(err){
    return res.status(401).send({status:false, msg:'Something Went Wrong.Please Try Again!'})
  }
  
}


//--

async function touch_status(req,res,next) {
  try{

   const { security_key,auth_key} = req.headers;
   const {  touch_status,pin } = req.body; 
   if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
   if (security_key != "OPAY@123") { message = "Invalid security key";
       res.status(403).json({'success': false,'code': 403,'msg': message, });
      res.end();
      return false;
  }
  if (auth_key === undefined || auth_key === null || auth_key === "") return res.json({ status: false, msg: 'Please provide the auth key.' });
let user = await Customer.findOne({ auth_key: auth_key});//Finding the specific User
  if (user === null || user === undefined || !user) return res.json({ status: false, msg: `User doesn't exist.`});

  if (touch_status === undefined || touch_status === null || touch_status === "") return res.json({ status: false, msg: 'Please provide the touch app status.' });

  
  if(touch_status ==="1"){
    if (pin === undefined || pin === null || pin === "") return res.json({ status: false, msg: 'Please provide the pin.' });
  
    var userpin=user.pin.toString()
   
    if(userpin !==pin){
      return res.json({ status: false, msg: 'Please provide the correct pin' });
  
    }
  
  }

  
  customer = Customer
 customer.updateMany({auth_key: auth_key}, { touch_status:touch_status}, function(err, affected, resp) {
 
})

if(touch_status ==="0"){
data1={
   "touch_status":false
}
return res.send({status: true, msg: 'Touch Status Disable' , data: data1})

}
else{ 
 data1={
   "touch_status":true
}
return res.send({status: true, msg: 'Touch Status Enable' , data: data1})
}

  } catch (err) {
   return res.status(401).send({ status: false, msg: 'Something Went Wrong.Please Try Again!' })
 }

  
}























