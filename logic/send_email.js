var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
const jwt = require('jsonwebtoken');
const config =require("config");
var emailDetails = require('../config/sms');
const Customer = require("../models/customer");
const jwtToken='OPAY';
const { email, password } = emailDetails
var mailAccountUser = email
var mailAccountPassword = password
var fromEmailAddress = email
var transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: mailAccountUser,
        pass: mailAccountPassword
    }
}))
sendEmail = (email1,emailverified,auth_key) => {
let displayMessageHTML;

const credentials = {
   
    email:email1,
    time: (new Date()).getTime()
  };

const token = jwt.sign(credentials, jwtToken, { algorithm: 'HS256' });

customer = Customer
    customer.updateOne({auth_key: auth_key}, { verificationLink:token}, function(err, affected, resp) {
    console.log(resp);
    }),
displayMessageHTML =` 
<img src="http://3.141.6.80/splash.png"  width="60" height="60">
<br>
<p>Hey <br>Click the big blue button below to verify your email address.</p>

<table border="0" cellspacing="0" cellpadding="0">
    <tr>
        <td align="center" style="border-radius: 3px;" bgcolor="#0000FF"><a href="${config.baseUrl1}/api/v1/opay/mailverification/${token}" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 24px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Verify email</a></td>
 </tr>
</table>
<br>
If the link doesn't work, just copy and paste the following URL into a web browser:<br>
<a href="${config.baseUrl1}/api/v1/opay/mailverification/${token}">${config.baseUrl1}/api/v1/opay/mailverification/${token}</a><br>
<br>
Email sent by Doshy.<br>
Doshy Pty Ltd. Copyright 2020. <br>
All rights reserved
<br>
 `
     
let email = {
        from: fromEmailAddress,
        to: email1,
        subject: "Verify your email",
        text: "Doshy",
        html: displayMessageHTML
    }
  try {
    transport.sendMail(email, function (error, response) {
            if (error) {
                console.log('The Error during mail sending', error)
                return false;
            } else {
                console.log('The Response during mail sending', response.response)
                console.log('The Response during mail sending', response)
                return true;
            }
        });
    }
    catch (err) {
        console.log('err is err', err)
        return false;
    }
}



module.exports = sendEmail

